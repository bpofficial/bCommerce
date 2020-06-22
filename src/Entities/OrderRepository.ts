import {EntityRepository, Repository} from 'typeorm';
import CommerceOrder from './OrderEntity';

@EntityRepository(CommerceOrder)
export default class CommerceOrderRepository extends Repository<
	CommerceOrder
> {}
