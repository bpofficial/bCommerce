import {
	BodyParams,
	Controller,
	Get,
	Inject,
	PathParams,
	Post,
	Put,
	Request,
	Status,
} from '@tsed/common';
import {BadRequest} from '@tsed/exceptions';
import {CREATED, OK} from 'http-status-codes';
import Security from '../Constants/SECURITY';
import JWT from '../Decorators/JWT';
import CommerceOrder from '../Entities/OrderEntity';
import CommerceOrderService from '../Services/Commerce/Orders';

/**
 * The order controller handles CRUD operations on orders.
 */
@Controller('/orders')
export default class CommerceOrdersController {
	/**
	 * Inject the Order Service into this controller.
	 * @see {@link CommerceOrderService | Order Service}
	 */
	@Inject(CommerceOrderService)
	private readonly orderService: CommerceOrderService;

	/**
	 * ***Get all Orders***
	 *
	 * An administrator or privileged user can use this
	 * endpoint to view a list of all orders.
	 *
	 * @security **ADMIN**
	 * @path GET /v1/orders
	 * @see {@link CommerceOrder | Orders}
	 */
	@Get()
	@Status(OK)
	@JWT({security: Security.ADMIN})
	public async getOrders() {
		return this.orderService.getAll();
	}

	/**
	 * ***Get an Order by id***
	 *
	 * A user can use this endpoint to find an order at any stage
	 * of the order's lifecycle. (Draft -> Completed).
	 *
	 * @param id
	 * @security **ADMIN**
	 * @path GET /v1/orders/:id
	 * @see {@link CommerceOrder | Orders}
	 */
	@Get('/:id')
	@Status(OK)
	@JWT({security: Security.HMAC})
	public async getOrder(@PathParams('id') id: string) {
		if (isNaN(id as any)) {
			throw new BadRequest('Expected a number in the path parameter.');
		}
		return this.orderService.getOne(Number(id));
	}

	/**
	 * ***Create a new Order***
	 *
	 * This endpoint is used during the checkout phase. Having
	 * completed the order details, this endpoint will receive
	 * a draft order and save it against the user forever, unless
	 * they do not pay and eventually delete the draft order.
	 *
	 * @remarks
	 * - The user can use the draft to pick up from where they left off later.
	 * - The draft should be visible in their orders page.
	 * - The user should be remarketed to for an abandonded cart after a period of time.
	 *
	 * @param request Express request instance.
	 * @param order Request body data to create an order with.
	 * @security **USER**
	 * @path POST /v1/orders
	 * @see {@link CommerceOrder | Orders}
	 */
	@Post()
	@Status(CREATED)
	@JWT({security: Security.HMAC})
	public async createOrder(
		@Request() request: Request,
		@BodyParams() order: Partial<CommerceOrder>,
	) {
		order.userIp = request.ip;
		order.userAgent = request.headers['user-agent'];
		return this.orderService.createOne(order);
	}

	/**
	 * ***Update an existing Order***
	 *
	 * Update an order with the request body. A user can
	 * use this endpoint to make changes to their order
	 * before it has been completed. Alternatively, an admin
	 * can make other changes even after completion, such as
	 * adding notes, other details, statuses etc.
	 *
	 * @remarks
	 * - Allow the ***user*** to change most things ***before*** completion.
	 * - Allow the ***admin*** to change most things ***after*** completion.
	 * - Payment details are **immutable**, once set they cannot be changed.
	 *
	 * @param request Express request instance.
	 * @param id The id of the order to update, set via the path parameter.
	 * @param order Request body data to update an order with.
	 * @security **USER** or **ADMIN**
	 * @path PUT /v1/orders/:id
	 * @see {@link CommerceOrder | Orders}
	 */
	@Put('/:id')
	@Status(OK)
	@JWT({security: Security.HMAC})
	public async updateOrder(
		@Request() request: Request,
		@PathParams('id') id: string,
		@BodyParams() order: Partial<CommerceOrder>,
	) {
		if (isNaN(id as any)) {
			throw new BadRequest(
				`Path parameter 'id' expected a number and received '${typeof id}'.`,
			);
		}
		order.userIp = request.ip;
		order.userAgent = request.headers['user-agent'];
		order.id = Number(id);
		return this.orderService.updateOne(order);
	}

	// no hard deletion at the moment.
}
