import {MaxLength, MinLength} from '@tsed/common';
import {BadRequest} from '@tsed/exceptions';
import {validate} from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'commerce_shipping'})
export default class CommerceShipping {
	@PrimaryGeneratedColumn('increment')
	public id: number;

	@Column({name: 'first_name', type: 'varchar', length: 100, nullable: false})
	@MinLength(1)
	@MaxLength(100)
	public firstName: string;

	@Column({name: 'last_name', type: 'varchar', length: 100, nullable: false})
	@MinLength(1)
	@MaxLength(100)
	public lastName: string;

	@Column({name: 'phone', type: 'varchar', length: 16, nullable: true})
	@MinLength(6)
	@MaxLength(16)
	public phone: string | null;

	@Column({name: 'company', type: 'text', nullable: true})
	public company: string | null;

	@Column({name: 'address_1', type: 'text', nullable: false})
	public addressOne: string;

	@Column({name: 'address_2', type: 'text', nullable: true})
	public addressTwo: string | null;

	@Column({name: 'suburb', type: 'text', nullable: false})
	public suburb: string;

	@Column({name: 'city', type: 'text', nullable: true})
	public city: string | null;

	@Column({name: 'region', type: 'text', nullable: false})
	public region: string;

	@Column({name: 'country', type: 'text', nullable: false})
	public country: string;

	@Column({name: 'post_code', type: 'tinytext', nullable: false})
	public postCode: string;

	public constructor(o: Partial<CommerceShipping>) {
		this.id = o?.id;
		this.firstName = o?.firstName;
		this.lastName = o?.lastName;
		this.phone = o?.phone;
		this.company = o?.company || null;
		this.addressOne = o?.addressOne;
		this.addressTwo = o?.addressTwo || null;
		this.suburb = o?.suburb;
		this.city = o?.city || null;
		this.region = o?.region;
		this.country = o?.country;
		this.postCode = o?.postCode;
	}

	@BeforeInsert()
	@BeforeUpdate()
	public async validate() {
		await validate(this).then((errors) => {
			if (errors.length) {
				const err = new BadRequest(
					'Failed to validate shipping details.',
				);
				err.body = errors.map((i) => Object.values(i.constraints));
				err.body = err.body.flat(2);
				throw err;
			}
		});
	}
}
