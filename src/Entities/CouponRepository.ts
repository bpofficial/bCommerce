import {EntityRepository} from '@tsed/typeorm';
import {Repository} from 'typeorm';
import CommerceCoupon from './CouponEntity';

@EntityRepository(CommerceCoupon)
export default class CommerceCouponRepository extends Repository<
	CommerceCoupon
> {}
