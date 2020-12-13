import {MaxLength} from '@tsed/common';
import {BadRequest} from '@tsed/exceptions';
import {validate} from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'commerce_term'})
export default class CommerceTerm {
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	public id: number;

	@Column({type: 'varchar', length: 200, nullable: false})
	@MaxLength(200)
	public name: string;

	@Column({type: 'varchar', length: 200, nullable: false, unique: true})
	@MaxLength(200)
	public slug: string;

	@Column({type: 'bigint', nullable: false, default: 0})
	public group: number;

	@Column({type: 'varchar', length: 20, nullable: false})
	@MaxLength(20)
	public taxonomy: string;

	public constructor(o: Partial<CommerceTerm>) {
		this.id = o?.id;
		this.name = o?.name;
		this.slug = o?.slug;
		this.group = o?.group || 0;
		this.taxonomy = o?.taxonomy;
	}

	@BeforeInsert()
	@BeforeUpdate()
	public async validate() {
		await validate(this, {
			skipUndefinedProperties: true,
			skipNullProperties: true,
		}).then((errors) => {
			if (errors.length) {
				const err = new BadRequest('Failed to validate term.');
				err.body = errors.map((i) => Object.values(i.constraints));
				err.body = err.body.flat(2);
				throw err;
			}
		});
	}
}
