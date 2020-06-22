import {EntityRepository} from '@tsed/typeorm';
import {Repository} from 'typeorm';
import CommerceShipping from './ShippingEntity';

@EntityRepository(CommerceShipping)
export default class CommerceShippingRepository extends Repository<
	CommerceShipping
> {}
