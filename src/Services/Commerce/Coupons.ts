/**
 * Author: Brayden Phillips
 */
import {Inject, Service} from '@tsed/di';
import {BadRequest} from '@tsed/exceptions';
import {UseConnection} from '@tsed/typeorm';
import {validate} from 'class-validator';
import CommerceCoupon from '../../Database/Entities/CouponEntity';
import CommerceOrder from '../../Database/Entities/OrderEntity';
import CommerceProduct from '../../Database/Entities/ProductEntity';
import CommerceCouponRepository from '../../Database/Repositories/CouponRepository';

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

	/**
	 * Create a new Coupon.
	 * @remarks
	 * The coupon parameter is validated before being
	 * saved.
	 *
	 * @param coupon The coupon to be created.
	 * @see {@link CommerceCoupon | Coupons}
	 */
	public async createOne(coupon: Partial<CommerceCoupon>) {
		const isNotUnique = coupon?.code
			? !!(await this.couponRepository.find({code: coupon.code})).length
			: false;
		if (isNotUnique) {
			throw new BadRequest('A coupon with this code already exists.');
		}
		await validate(new CommerceCoupon(coupon), {
			skipNullProperties: true,
		}).then((errors) => {
			if (errors.length) {
				const err = new BadRequest('Failed to validate coupon.');
				err.body = errors.map((i) => Object.values(i.constraints));
				err.body = err.body.flat(2);
				throw err;
			}
		});
		const result = await this.couponRepository.save(coupon);
		return this.couponRepository.findOne({id: result.id});
	}

	/**
	 * Get a single coupon by id.
	 * @param id Primary Key (id) of the coupon.
	 */
	public getOne(id: number) {
		return this.couponRepository.findOne(id);
	}

	/**
	 * Get all coupons.
	 * @todo Paginate
	 */
	public getAll() {
		return this.couponRepository.find();
	}

	/**
	 * Update a single coupon.
	 * @remarks
	 * The id is required in the 'coupon' parameter to identify
	 * the correct coupon to update.
	 *
	 * @param coupon The update to be made.
	 */
	public async updateOne(coupon: Partial<CommerceCoupon> & {id: number}) {
		await this.couponRepository.update(coupon.id, coupon);
		return this.couponRepository.findOne({id: coupon.id});
	}

	/**
	 * Hard delete a single coupon.
	 * @param id Primary Key (id) of the coupon.
	 */
	public deleteOne(id: number) {
		return this.couponRepository.delete(id);
	}
}
