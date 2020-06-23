import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'commerce_term'})
export default class CommerceTerm {
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	public id: number;

	@Column({type: 'varchar', length: 200, nullable: false})
	public name: string;

	@Column({type: 'varchar', length: 200, nullable: false})
	public slug: string;

	@Column({type: 'bigint', nullable: false, default: 0})
	public group: number;

	@Column({type: 'varchar', length: 20, nullable: false})
	public taxonomy: string;
}
