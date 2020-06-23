import {EntityRepository, Repository} from 'typeorm';
import CommerceOrder from '../Entities/OrderEntity';

@EntityRepository(CommerceOrder)
export default class CommerceOrderRepository extends Repository<
	CommerceOrder
> {}
