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
import CommerceCustomer from '../Database/Entities/CustomerEntity';
import JWT from '../Security/JWT';
import CommerceCustomerService from '../Services/Commerce/Customer';

@Controller('/customers')
export default class CommerceCustomersController {
	@Inject() private readonly customerService: CommerceCustomerService;
	/**
	 * ***Get all Customers***
	 *
	 * An administrator or other privileged user can use
	 * this endpoint to view a list of all customers.
	 *
	 * @security **ADMIN**
	 * @path GET /v1/customers
	 */
	@Get()
	@Status(OK, {
		type: CommerceCustomer,
		description: 'Get all customers.',
	})
	@JWT({security: Security.ADMIN})
	public async getCustomers() {
		return this.customerService.getAll();
	}

	/**
	 * ***Get a Customer by id***
	 *
	 * A user can use this endpoint to auto-populate their shipping,
	 * payment and other details during the cart-checkout process. Additionally,
	 * this endpoint is used to display customer infomation on their account page.
	 *
	 * @security **USER**
	 * @param id The id of a customer.
	 * @path GET /v1/customers/:id
	 */
	@Get('/:id')
	@Status(OK, {
		type: CommerceCustomer,
		description: 'Get a customer by their id.',
	})
	// @JWT({security: Security.HMAC})
	public async getCustomer(@PathParams('id') id: string) {
		return this.customerService.getOne(id);
	}

	/**
	 * ***Create a new Customer***
	 *
	 * A new user can POST to this path during the checkout
	 * process when they choose to create a new account.
	 *
	 * @warning This might not be a necessary endpoint.
	 * @security **USER**
	 * @path POST /v1/customers
	 */
	@Post()
	@Status(CREATED, {
		type: String,
		description: 'Create a customer.',
	})
	// @JWT({security: Security.HMAC})
	public async createCustomer(
		@BodyParams() customer: Partial<CommerceCustomer>,
	) {
		const result = await this.customerService.createOne(customer);
		return `/customers/${result.id}`;
	}

	/**
	 * ***Update an existing Customer***
	 *
	 * A user can PUT data at this path to update information
	 * such as their shipping details, default payment details and
	 * other fields that directly relate to their customer-ness.
	 *
	 * @security **USER**
	 * @path PUT /v1/customers/:id
	 */
	@Put('/:id')
	@Status(OK, {
		type: CommerceCustomer,
		description: 'Update a customer.',
	})
	@JWT({security: Security.HMAC})
	public async updateCustomer(
		@PathParams('id') id: string,
		@BodyParams() customer: Partial<CommerceCustomer>,
	) {
		if (isNaN(id as any)) {
			throw new BadRequest(
				`Path parameter 'id' expected a number and received '${typeof id}'.`,
			);
		}
		return this.customerService.updateOne(Number(id), customer);
	}

	/**
	 * ***Delete an existing Customer***
	 *
	 * A user can DELETE at this path to remove the user
	 * given by the provided *id*, depending on their access
	 * to do so.
	 *
	 * @security **USER**
	 * @path DEL /v1/customers/:id
	 */
	@Delete('/:id')
	@Status(NO_CONTENT, {
		description: 'Delete a customer.',
	})
	@JWT({security: Security.HMAC})
	public async deleteCustomer(@PathParams('id') id: string) {
		if (isNaN(id as any)) {
			throw new BadRequest(
				`Path parameter 'id' expected a number and received '${typeof id}'.`,
			);
		}
		this.customerService.deleteOne(Number(id));
		return;
	}
}
