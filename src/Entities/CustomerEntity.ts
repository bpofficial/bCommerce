import {
	Column,
	Entity,
	Index,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import CommerceShipping from './ShippingEntity';

@Entity({name: 'commerce_customers'})
export default class CommerceCustomer {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({
		name: 'user_id',
		type: 'bigint',
		unsigned: true,
		nullable: true,
		unique: true,
	})
	public user: number | null;

	@OneToOne((type) => CommerceShipping, {
		cascade: true,
	})
	@JoinColumn({name: 'billing_id'})
	public billing: CommerceShipping;

	@OneToOne((type) => CommerceShipping, {
		cascade: true,
	})
	@JoinColumn({name: 'shipping_id'})
	public shipping: CommerceShipping;
}
