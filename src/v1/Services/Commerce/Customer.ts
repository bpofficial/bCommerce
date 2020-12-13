import {Inject, Service} from '@tsed/di';
import {UseConnection} from '@tsed/typeorm';
import {FindOperator} from 'typeorm';
import CommerceCustomer from '../../Database/Entities/CustomerEntity';
import CommerceCustomerRepository from '../../Database/Repositories/CustomerRepository';

@Service()
export default class CommerceCustomerService {
	@Inject()
	@UseConnection('default')
	private customerRepository: CommerceCustomerRepository;

	public async createOne(obj: Partial<CommerceCustomer>) {
		const customer = new CommerceCustomer(obj);
		const result = await this.customerRepository.save(customer);
		return this.customerRepository.findOne(result.id, {
			relations: ['billing', 'shipping'],
		});
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
		const obj = {
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
		const update = new CommerceCustomer(obj as any);
		const result = await this.customerRepository.save(update);
		return this.customerRepository.findOne(result.id, {
			relations: ['billing', 'shipping'],
		});
	}

	public async deleteOne(id: number) {
		this.customerRepository.delete({id});
	}
}
