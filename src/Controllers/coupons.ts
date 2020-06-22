import {
	BodyParams,
	Controller,
	Delete,
	Get,
	Inject,
	PathParams,
	Post,
	Put,
	Status,
} from '@tsed/common';
import {BadRequest} from '@tsed/exceptions';
import {CREATED, NO_CONTENT, OK} from 'http-status-codes';
import Security from '../Constants/SECURITY';
import JWT from '../Decorators/JWT';
import CommerceCoupon from '../Entities/CouponEntity';
import CommerceCouponService from '../Services/Commerce/Coupons';

@Controller('/coupons')
export default class CommerceCouponsController {
	@Inject() private readonly couponService: CommerceCouponService;

	/**
	 *
	 */
	@Get()
	@Status(OK)
	@JWT({security: Security.ADMIN})
	public async getCoupons() {
		return this.couponService.getAll();
	}

	/**
	 *
	 * @param id
	 */
	@Get('/:id')
	@Status(OK)
	@JWT({security: Security.ADMIN})
	public async getCoupon(@PathParams('id') id: string) {
		if (isNaN(id as any)) {
			throw new BadRequest(
				`Path parameter 'id' expected a number and received '${typeof id}'.`,
			);
		}
		return this.couponService.getOne(Number(id));
	}

	/**
	 *
	 * @param coupon
	 */
	@Post()
	@Status(CREATED)
	@JWT({security: Security.ADMIN})
	public async createCoupon(@BodyParams() coupon: Partial<CommerceCoupon>) {
		return this.couponService.createOne(coupon);
	}

	/**
	 *
	 * @param id
	 * @param coupon
	 */
	@Put()
	@Status(OK)
	@JWT({security: Security.ADMIN})
	public async updateCoupon(
		@PathParams('id') id: string,
		@BodyParams() coupon: Partial<CommerceCoupon>,
	) {
		if (isNaN(id as any)) {
			throw new BadRequest(
				`Path parameter 'id' expected a number and received '${typeof id}'.`,
			);
		}
		return this.couponService.updateOne({id: Number(id), ...coupon});
	}

	/**
	 *
	 * @param id
	 */
	@Delete()
	@Status(NO_CONTENT)
	@JWT({security: Security.ADMIN})
	public async deleteCoupon(@PathParams('id') id: string) {
		if (isNaN(id as any)) {
			throw new BadRequest(
				`Path parameter 'id' expected a number and received '${typeof id}'.`,
			);
		}
		this.couponService.deleteOne(Number(id));
	}
}
