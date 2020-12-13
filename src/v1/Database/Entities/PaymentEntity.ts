import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'commerce_payments'})
export default class CommercePayment {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({type: 'varchar', length: 20, nullable: false, default: 'AUD'})
	public currency: string | 'AUD';

	@Column({type: 'text', nullable: false})
	public reciept: string;

	@Column({type: 'text', nullable: false})
	public merchant: string;

	@Column({type: 'float', nullable: false, unsigned: true})
	public amount: number;

	@Column({
		name: 'order_id',
		type: 'bigint',
		nullable: false,
		unsigned: true,
	})
	public orderId: number;

	@CreateDateColumn({name: 'date_created'})
	public dateCreated: Date;

	@UpdateDateColumn({name: 'date_modified'})
	public dateModified: Date;
}
