import {Inject, Service} from '@tsed/di';
import {UseConnection} from '@tsed/typeorm';
import {validate} from 'class-validator';
import CommerceCoupon from '../../Database/Entities/CouponEntity';
import CommerceCouponRepository from '../../Database/Repositories/CouponRepository';
import CommerceOrder from '../../Database/Entities/OrderEntity';
import CommerceProduct from '../../Database/Entities/ProductEntity';
import CommerceProductRepository from '../../Database/Repositories/ProductRepository';

@Service()
export default class CommerceCouponService {
	@Inject()
	@UseConnection('default')
	private readonly couponRepository: CommerceCouponRepository;

	@Inject()
	@UseConnection('default')
	private readonly productRepository: CommerceProductRepository;

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

	public async createOne(coupon: Partial<CommerceCoupon>) {
		return this.couponRepository.save(coupon);
	}

	public getOne(id: number) {
		return this.couponRepository.findOne(id);
	}

	public getAll() {
		return this.couponRepository.find();
	}

	public async updateOne(coupon: Partial<CommerceCoupon>) {
		await this.couponRepository.update(coupon.id, coupon);
		return this.couponRepository.findOne({id: coupon.id});
	}

	public deleteOne(id: number) {
		return this.couponRepository.delete(id);
	}
}
