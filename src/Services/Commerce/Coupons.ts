import {Inject, Service} from '@tsed/di';
import {UseConnection} from '@tsed/typeorm';
import CommerceCoupon from '../../Entities/CouponEntity';
import CommerceCouponRepository from '../../Entities/CouponRepository';
import CommerceOrder from '../../Entities/OrderEntity';
import CommerceProduct from '../../Entities/ProductEntity';

@Service()
export default class CommerceCouponService {
	@Inject()
	@UseConnection('default')
	private readonly couponRepository: CommerceCouponRepository;

	public validateOrderCoupon(order: Partial<CommerceOrder>) {
		// do that
		return true;
	}
	public validateProductCoupon(
		product: Partial<CommerceProduct>,
		coupon: Partial<CommerceCoupon>,
	) {
		return true;
	}

	public createOne(coupon: Partial<CommerceCoupon>) {
		return this.couponRepository.save(coupon);
	}

	public getOne(id: number) {
		return this.couponRepository.findOne(id) || {};
	}

	public getAll() {
		return this.couponRepository.find() || [];
	}

	public async updateOne(coupon: Partial<CommerceCoupon>) {
		await this.couponRepository.update(coupon.id, coupon);
		return this.couponRepository.findOne({id: coupon.id});
	}

	public deleteOne(id: number) {
		return this.couponRepository.delete(id);
	}
}
