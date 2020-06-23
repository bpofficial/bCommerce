import {
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import CommerceProduct from './ProductEntity';

@Entity({name: 'commerce_carts'})
export default class CommerceCart {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;
	public customer: number | null;
	public anonymous: boolean;
	public items: CommerceProduct[];
	public abandoned: boolean;

	@CreateDateColumn({name: 'date_created'})
	public dateCreated: Date;

	@UpdateDateColumn({name: 'date_modified'})
	public dateModified: Date;
}
