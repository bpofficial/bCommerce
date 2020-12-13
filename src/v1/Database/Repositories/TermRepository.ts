import {EntityRepository} from '@tsed/typeorm';
import {Repository} from 'typeorm';
import CommerceTerm from '../Entities/TermEntity';

@EntityRepository(CommerceTerm)
export default class CommerceTermRepository extends Repository<CommerceTerm> {}
