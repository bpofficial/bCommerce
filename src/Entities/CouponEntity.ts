import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import CommerceProduct from './ProductEntity';
import CommerceTerm from './TermEntity';

@Entity({name: 'commerce_coupons'})
export default class CommerceCoupon {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({type: 'varchar', length: 50, nullable: false, unique: true})
	public code: string;

	@Column({type: 'text', nullable: true})
	public description: string | null;

	@Column({name: 'amount', type: 'float', nullable: false})
	public couponAmount: number;

	@Column({name: 'free_shipping', nullable: false, default: false})
	public freeShipping: boolean;

	@Column({name: 'expiry_date', type: 'datetime', nullable: true})
	public expiryDate: Date | null;

	@Column({name: 'minimum_amount', type: 'float', nullable: true})
	public minimumAmount: number | null;

	@Column({name: 'maximum_amount', type: 'float', nullable: true})
	public maximumAmount: number | null;

	@Column({name: 'individual_use', nullable: false, default: false})
	public individualUse: boolean;

	@Column({name: 'exclude_sale_items', nullable: false, default: false})
	public excludeSaleItems: boolean;

	public products: CommerceProduct[];
	public excludeProducts: CommerceProduct[];
	public productCategories: CommerceTerm[];
	public excludeProductCategories: CommerceTerm[];
	public customerEmail: string;

	@Column({name: 'usage_limit', type: 'int', nullable: true, unsigned: true})
	public usageLimit: number;

	@Column({
		name: 'usage_limit_per_user',
		type: 'int',
		nullable: true,
		unsigned: true,
	})
	public usageLimitPerUser: number;

	@Column({name: 'usage_count', type: 'int', nullable: true, unsigned: true})
	public usageCount: number | null;
}
