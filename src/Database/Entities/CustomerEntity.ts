import {BadRequest} from '@tsed/exceptions';
import {
	IsNotEmptyObject,
	validate,
	ValidateIf,
	ValidateNested,
} from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import CommerceShipping from './ShippingEntity';

@Entity({name: 'commerce_customers'})
export default class CommerceCustomer {
	@PrimaryGeneratedColumn('increment')
	public id: number;

	@Column({
		name: 'user_id',
		type: 'bigint',
		unsigned: true,
		nullable: true,
		unique: true,
	})
	public user: number | null;

	/**
	 * Customer billing details.
	 * @remarks
	 * If customer shipping details are empty, this object is checked
	 * for emptiness.
	 * If shipping & billing details are empty, an error is thrown.
	 */
	@OneToOne((type) => CommerceShipping, {
		cascade: true,
	})
	@JoinColumn({name: 'billing_id'})
	@ValidateIf((o: Partial<CommerceCustomer>) => !o?.shipping)
	@ValidateNested()
	public billing: CommerceShipping;

	/**
	 * Customer shipping details.
	 * @remarks
	 * If customer billing details are empty, this object is checked
	 * for emptiness.
	 * If shipping & billing details are empty, an error is thrown.
	 */
	@OneToOne((type) => CommerceShipping, {
		cascade: true,
	})
	@JoinColumn({name: 'shipping_id'})
	@ValidateIf((o: Partial<CommerceCustomer>) => !o?.billing)
	@IsNotEmptyObject()
	@ValidateNested()
	public shipping: CommerceShipping;

	public constructor(o: Partial<CommerceCustomer>) {
		this.id = o?.id;
		this.user = o?.user;
		this.billing = o?.billing;
		this.shipping = o?.shipping;
	}

	@BeforeInsert()
	@BeforeUpdate()
	public async validate() {
		await validate(this).then((errors) => {
			if (errors.length) {
				const err = new BadRequest('Failed to validate customer.');
				err.body = errors.map((i) => Object.values(i.constraints));
				err.body = err.body.flat(2);
				throw err;
			}
		});
	}
}
