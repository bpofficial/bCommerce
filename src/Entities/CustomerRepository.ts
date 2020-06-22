import {EntityRepository} from '@tsed/typeorm';
import {Repository} from 'typeorm';
import CommerceCustomer from './CustomerEntity';

@EntityRepository(CommerceCustomer)
export default class CommerceCustomerRepository extends Repository<
	CommerceCustomer
> {
	public findById(id: string | number) {
		return this.findOne(id);
	}
}
