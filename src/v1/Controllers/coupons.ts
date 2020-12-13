/**
 *
 * Author: Brayden Phillips
 */
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
import CommerceCoupon from '../Database/Entities/CouponEntity';
import JWT from '../Security/JWT';
import CommerceCouponService from '../Services/Commerce/Coupons';

@Controller('/coupons')
export default class CommerceCouponsController {
	@Inject() private readonly couponService: CommerceCouponService;

	/**
	 * ***Get all Coupons***
	 *
	 * @security **ADMIN**
	 * @path GET /v1/coupons
	 * @see {@link CommerceCoupon | Coupons}
	 */
	@Get()
	@Status(OK, {
		type: CommerceCoupon,
		description: 'Get all coupons.',
	})
	@JWT({security: Security.ADMIN})
	public async getCoupons() {
		return this.couponService.getAll();
	}

	/**
	 * ***Get a Coupon by id***
	 *
	 * @param id
	 * @security **ADMIN**
	 * @path GET /v1/coupons/:id
	 * @see {@link CommerceCoupon | Coupons}
	 */
	@Get('/:id')
	@Status(OK, {
		type: CommerceCoupon,
		description: 'Get a coupon by its id.',
	})
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
	 * ***Create a new Coupon***
	 *
	 * @param coupon
	 * @security **ADMIN**
	 * @path POST /v1/coupons
	 * @see {@link CommerceCoupon | Coupons}
	 */
	@Post()
	@Status(CREATED, {
		type: CommerceCoupon,
		description: 'Create a coupon.',
	})
	// @JWT({security: Security.ADMIN})
	public async createCoupon(@BodyParams() coupon: Partial<CommerceCoupon>) {
		return this.couponService.createOne(coupon);
	}

	/**
	 * ***Update an existing Coupon***
	 *
	 * @param id
	 * @param coupon
	 * @security **ADMIN**
	 * @path PUT /v1/coupons/:id
	 * @see {@link CommerceCoupon | Coupons}
	 */
	@Put('/:id')
	@Status(OK, {
		type: CommerceCoupon,
		description: 'Update a coupon.',
	})
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
	 * ***Delete an existing Coupon***
	 *
	 * @param id
	 * @security **ADMIN**
	 * @path DELETE /v1/coupons/:id
	 * @see {@link CommerceCoupon | Coupons}
	 */
	@Delete('/:id')
	@Status(NO_CONTENT, {
		description: 'Delte a coupon.',
	})
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
