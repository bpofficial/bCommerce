import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import CommerceCoupon from './CouponEntity';
import CommerceCustomer from './CustomerEntity';
import CommercePayment from './PaymentEntity';
import CommerceProduct from './ProductEntity';

@Entity({name: 'commerce_orders'})
export default class CommerceOrder {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({type: 'varchar', length: 100, nullable: false})
	public key: string;

	@Column({type: 'varchar', length: 100, nullable: false})
	public status: string;

	@Column({type: 'varchar', length: 20, nullable: false})
	public version: string;

	@OneToOne((type) => CommerceCustomer)
	@JoinColumn({name: 'customer_id'})
	public customer: CommerceCustomer;

	@Column({name: 'user_ip', type: 'varchar', length: 20, nullable: false})
	public userIp: string;

	@Column({name: 'user_agent', type: 'varchar', length: 255, nullable: false})
	public userAgent: string;

	@Column({name: 'user_notes', type: 'text', nullable: false})
	public userNotes: string;

	@Column({name: 'admin_notes', type: 'text', nullable: false})
	public adminNotes: string;

	@Column({
		name: 'created_via',
		type: 'varchar',
		length: 100,
		nullable: false,
	})
	public createdVia: string;

	@Column({
		name: 'shipping_method',
		type: 'varchar',
		length: 100,
		nullable: false,
	})
	public shippingMethod: string;

	@ManyToMany((type) => CommerceProduct)
	public items: CommerceProduct[];

	@OneToOne((type) => CommerceCoupon)
	@JoinColumn({name: 'coupon_id'})
	public coupon: CommerceCoupon;

	@Column({name: 'tax_rate', type: 'float', nullable: false})
	public taxRate: number;

	@Column({name: 'sub_total', type: 'float', nullable: false})
	public subTotal: number;

	@Column({name: 'tax_total', type: 'float', nullable: false})
	public taxTotal: number;

	@Column({name: 'discount_total', type: 'float', nullable: false})
	public discountTotal: number;

	@Column({name: 'discount_tax', type: 'float', nullable: false})
	public discountTax: number;

	@Column({name: 'cart_total', type: 'float', nullable: false})
	public cartTotal: number;

	@Column({type: 'float', nullable: false})
	public total: number;

	@Column({name: 'prices_include_tax', nullable: false, default: 1})
	public pricesIncludeTax: boolean;

	@CreateDateColumn({name: 'date_created'})
	public dateCreated: Date;

	@UpdateDateColumn({name: 'date_modified'})
	public dateModified: Date;

	@Column({name: 'date_paid', type: 'datetime', nullable: false})
	public datePaid: Date;

	@Column({name: 'date_completed', type: 'datetime', nullable: false})
	public dateCompleted: Date;

	@OneToOne((type) => CommercePayment, {nullable: true})
	public payment: CommercePayment | null;
}
