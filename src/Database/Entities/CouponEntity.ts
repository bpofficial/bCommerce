import {MaxLength} from '@tsed/common';
import {IsEmail, Min} from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'commerce_coupons'})
export default class CommerceCoupon {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({type: 'varchar', length: 50, nullable: false, unique: true})
	@MaxLength(50)
	public code: string;

	@Column({type: 'text', nullable: true})
	public description: string | null;

	@Column({name: 'amount', type: 'float', nullable: false})
	@Min(0)
	public couponAmount: number;

	@Column({name: 'free_shipping', nullable: false, default: false})
	public freeShipping: boolean;

	@Column({name: 'expiry_date', type: 'datetime', nullable: true})
	public expiryDate: Date | null;

	@Column({name: 'minimum_amount', type: 'float', nullable: true})
	@Min(0)
	public minimumAmount: number | null;

	@Column({name: 'maximum_amount', type: 'float', nullable: true})
	public maximumAmount: number | null;

	@Column({name: 'individual_use', nullable: false, default: false})
	public individualUse: boolean;

	@Column({name: 'exclude_sale_items', nullable: false, default: false})
	public excludeSaleItems: boolean;

	@Column({type: 'simple-array', nullable: true})
	public products: number[] | null;

	@Column({type: 'simple-array', nullable: true})
	public excludeProducts: number[] | null;

	@Column({type: 'simple-array', nullable: true})
	public productCategories: number[] | null;

	@Column({type: 'simple-array', nullable: true})
	public excludeProductCategories: number[] | null;

	@Column({
		name: 'customer_email',
		type: 'varchar',
		length: 255,
		nullable: true,
	})
	@IsEmail()
	@MaxLength(255)
	public customerEmail: string | null;

	@Column({name: 'usage_limit', type: 'int', nullable: true, unsigned: true})
	@Min(0)
	public usageLimit: number | null;

	@Column({
		name: 'usage_limit_per_user',
		type: 'int',
		nullable: true,
		unsigned: true,
	})
	public usageLimitPerUser: number | null;

	@Column({name: 'usage_count', type: 'int', nullable: true, unsigned: true})
	public usageCount: number | null;

	@CreateDateColumn({name: 'date_created'})
	public dateCreated: Date;

	@UpdateDateColumn({name: 'date_modified'})
	public dateModified: Date;

	public constructor(o: Partial<CommerceCoupon>) {
		this.id = o?.id;
		this.code = o?.code;
		this.description = o?.description || null;
		this.couponAmount = o?.couponAmount;
		this.freeShipping = o?.freeShipping || false;
		this.expiryDate = o?.expiryDate || null;
		this.minimumAmount = o?.minimumAmount || null;
		this.maximumAmount = o?.maximumAmount || null;
		this.individualUse = o?.individualUse || false;
		this.excludeSaleItems = o?.excludeSaleItems || false;
		this.products = o?.products || null;
		this.excludeProducts = o?.excludeProducts || null;
		this.productCategories = o?.productCategories || null;
		this.excludeProductCategories = o?.excludeProductCategories || null;
		this.customerEmail = o?.customerEmail || null;
		this.usageLimit = o?.usageLimit || null;
		this.usageLimitPerUser = o?.usageLimitPerUser || null;
		this.usageCount = o?.usageCount || null;
		this.dateCreated = o?.dateCreated;
		this.dateModified = o?.dateModified;
	}
}
