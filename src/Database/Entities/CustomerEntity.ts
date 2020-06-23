import {IsNotEmptyObject, ValidateIf} from 'class-validator';
import {
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
	 */
	@OneToOne((type) => CommerceShipping, {
		cascade: true,
	})
	@JoinColumn({name: 'billing_id'})
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
	public shipping: CommerceShipping;
}
