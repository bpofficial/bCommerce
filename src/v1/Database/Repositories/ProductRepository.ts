import {EntityRepository} from '@tsed/typeorm';
import {Repository} from 'typeorm';
import CommerceProduct from '../Entities/ProductEntity';

@EntityRepository(CommerceProduct)
export default class CommerceProductRepository extends Repository<
	CommerceProduct
> {}
