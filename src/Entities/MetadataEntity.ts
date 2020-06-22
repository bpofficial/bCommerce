import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'commerce_metadata'})
export default class CommerceMetadata {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({type: 'varchar', length: 50, nullable: false})
	public table: string;

	@Column({name: 'table_id', type: 'bigint', unsigned: true, nullable: false})
	public tableId: number;

	@Column({type: 'varchar', length: 200, nullable: false})
	public key: string;

	@Column({type: 'text', nullable: false})
	public value: string;
}
