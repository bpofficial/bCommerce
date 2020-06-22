import {IgnoreProperty} from '@tsed/common';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'commerce_shipping'})
export default class CommerceShipping {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id?: number;

	@Column({name: 'first_name', type: 'varchar', length: 100, nullable: false})
	public firstName: string;

	@Column({name: 'last_name', type: 'varchar', length: 100, nullable: false})
	public lastName: string;

	@Column({name: 'phone', type: 'varchar', length: 100, nullable: false})
	public phone: string;

	@Column({name: 'company', type: 'text', nullable: true})
	public company: string | null;

	@Column({name: 'address_1', type: 'text', nullable: false})
	public addressOne: string;

	@Column({name: 'address_2', type: 'text', nullable: true})
	public addressTwo: string | null;

	@Column({name: 'suburb', type: 'text', nullable: false})
	public suburb: string;

	@Column({name: 'city', type: 'text', nullable: false})
	public city: string;

	@Column({name: 'region', type: 'text', nullable: false})
	public region: string;

	@Column({name: 'country', type: 'text', nullable: false})
	public country: string;

	@Column({name: 'post_code', type: 'tinytext', nullable: false})
	public postCode: string;
}
