import {Inject, Service} from '@tsed/di';
import {v4 as uuid} from 'uuid';
import CommerceOrder from '../../Entities/OrderEntity';
import CommerceOrderRepository from '../../Entities/OrderRepository';
import CommerceCouponService from './Coupons';
import CommerceShippingService from './Shipping';

@Service()
export default class CommerceOrderService {
	@Inject() private orderRepository: CommerceOrderRepository;
	@Inject() private couponService: CommerceCouponService;
	@Inject() private shippingService: CommerceShippingService;

	public async createOne(order: Partial<CommerceOrder>) {
		order.discountTax = 0;
		order.discountTotal = 0;
		order.status = 'pending';
		order.pricesIncludeTax = true;
		order.taxRate = 0.1;
		order.version = '1.0.0';
		// Validate that the coupon can be used with the order,
		// if not throw an error that the client will handle.
		this.couponService.validateOrderCoupon(order);
		order.cartTotal = order.items.reduce((prev, curr) => {
			// Validate that the product can be used with the coupon,
			// if not, throw an error that the client will handle.
			this.couponService.validateProductCoupon(curr, order?.coupon);
			return prev + curr.salePrice || curr.price;
		}, 0);
		order.subTotal = order.cartTotal * (1 + order.taxRate);
		order.taxTotal = order.subTotal - order.cartTotal;
		const shippingTotal = await this.shippingService.calculateShipping(
			order.shippingMethod,
			order.customer.shipping || order.customer.billing,
		);
		order.total = order.cartTotal + order.taxRate + shippingTotal;
		order.key = uuid();
		return this.orderRepository.save(order);
	}

	public updateOne(order: Partial<CommerceOrder>) {
		return this.orderRepository.update({id: order.id}, order);
	}

	public getOne(id: number): Promise<CommerceOrder> {
		return this.orderRepository.findOne(id);
	}

	public getAll(): Promise<CommerceOrder[]> {
		return this.orderRepository.find();
	}
}
