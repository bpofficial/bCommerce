import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'commerce_comments'})
export default class CommerceComment {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({
		name: 'post_id',
		type: 'bigint',
		nullable: false,
		unsigned: true,
		default: 0,
	})
	@Index()
	public postId?: number | 0;

	@Column({name: 'author', type: 'tinytext', nullable: false})
	public author: string;

	@Column({
		name: 'author_email',
		type: 'varchar',
		length: 100,
		nullable: false,
	})
	@Index()
	public authorEmail: string;

	@Column({name: 'author_url', type: 'varchar', length: 200, nullable: false})
	public authorUrl: string;

	@Column({name: 'author_ip', type: 'varchar', length: 100, nullable: false})
	public authorIP: string;

	@CreateDateColumn({name: 'date_created'})
	public dateCreated: Date;

	@UpdateDateColumn({name: 'date_modified'})
	public dateModified: Date;

	@Column({name: 'content', type: 'text', nullable: false})
	public content: string;

	@Column({
		name: 'karma',
		type: 'int',
		nullable: false,
		default: 0,
	})
	public karma: number | 0;

	@Column({
		name: 'approved',
		type: 'varchar',
		length: 20,
		nullable: false,
		default: '1',
	})
	@Index()
	public approved: string | '1';

	@Column({name: 'agent', type: 'varchar', length: 255, nullable: false})
	public agent: string;

	@Column({name: 'type', type: 'varchar', length: 20, nullable: false})
	@Index()
	public type: string;

	@Column({
		name: 'parent',
		type: 'bigint',
		unsigned: true,
		nullable: false,
		default: 0,
	})
	@Index()
	public parent: number | 0;

	@Column({
		name: 'user_id',
		type: 'bigint',
		unsigned: true,
		nullable: false,
		default: 0,
	})
	public user: number | 0;

	@Column({
		name: 'rating',
		type: 'tinyint',
		unsigned: true,
		nullable: true,
	})
	public rating: number;
}
