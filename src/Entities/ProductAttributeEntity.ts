import {
	Column,
	Entity,
	Index,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import CommerceTerm from './TermEntity';

@Entity({name: 'commerce_product_attributes'})
export default class CommerceProductAttribute {
	@PrimaryGeneratedColumn('increment', {unsigned: true, type: 'bigint'})
	public id: number;

	@Column({type: 'varchar', length: 200, nullable: false})
	@Index()
	public name: string;

	@Column({type: 'varchar', length: 200, nullable: true, default: null})
	public label?: string;

	@Column({type: 'varchar', length: 20, nullable: false})
	public type: string;

	@Column({name: 'order_by', type: 'varchar', length: 20, nullable: false})
	public orderBy: string;

	@Column({nullable: false, default: true})
	public public?: boolean;

	@OneToMany((type) => CommerceTerm, (term) => term.id)
	public terms: CommerceTerm[];
}
