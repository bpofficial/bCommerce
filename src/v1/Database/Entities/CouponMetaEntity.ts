import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import CommerceCoupon from './CouponEntity';

@Entity({name: 'commerce_couponmeta'})
export default class CommerceCouponMeta {
	@PrimaryGeneratedColumn('increment')
	public id: number;

	@ManyToOne((type) => CommerceCoupon, {cascade: true})
	@JoinColumn({name: 'coupon_id'})
	public coupon: CommerceCoupon;

	@Column({type: 'varchar', length: 255, nullable: false})
	public key: string;

	@Column({type: 'text', nullable: false})
	public value: string;
}
