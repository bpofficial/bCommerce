import {Inject, Service} from '@tsed/di';
import {BadRequest} from '@tsed/exceptions';
import {UseConnection} from '@tsed/typeorm';
import {FindOperator} from 'typeorm';
import CommerceCustomer from '../../Entities/CustomerEntity';
import CommerceCustomerRepository from '../../Entities/CustomerRepository';

@Service()
export default class CommerceCustomerService {
	@Inject()
	@UseConnection('default')
	private customerRepository: CommerceCustomerRepository;

	public async createOne(customer: Partial<CommerceCustomer>) {
		if (!customer?.shipping) {
			customer.shipping = customer.billing;
		}
		if (!customer?.billing) {
			throw new BadRequest(
				"Expected an address for at least 'billing' but received nothing.",
			);
		}
		if (!customer.user) {
			customer.user = null;
		}
		return this.customerRepository.save(customer);
	}

	public async getOne(id: number | string) {
		return this.customerRepository.findOne(id, {
			relations: ['billing', 'shipping'],
		});
	}

	public async getAll() {
		return this.customerRepository.find({
			relations: ['billing', 'shipping'],
		});
	}

	public async updateOne(id: number, customer: Partial<CommerceCustomer>) {
		const customerRecord = await this.customerRepository.findOne(id, {
			relations: ['billing', 'shipping'],
		});
		const update = {
			...customerRecord,
			billing: {
				...(customerRecord?.billing ? customerRecord?.billing : {}),
				...(customer?.billing ? customer?.billing : {}),
			},
			shipping: {
				...(customerRecord?.shipping ? customerRecord?.shipping : {}),
				...(customer?.shipping ? customer?.shipping : {}),
			},
		};
		await this.customerRepository.save(update);
		return this.customerRepository.findOne(id, {
			relations: ['billing', 'shipping'],
		});
	}

	public async deleteOne(id: number | FindOperator<number>) {
		this.customerRepository.delete({id});
	}
}
