import {Metadata} from '@tsed/core';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import CommerceMetadata from './MetadataEntity';

@Entity({name: 'media'})
export default class CommerceMedia {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({type: 'varchar', length: 100, nullable: false})
	public name: string;

	@Column({
		name: 'alternative_text',
		type: 'varchar',
		length: 100,
		nullable: true,
	})
	public alternativeText: string | null;

	@Column({type: 'varchar', length: 255, nullable: true})
	public caption: string | null;

	@Column({type: 'int', nullable: false, unsigned: true})
	public width: number;

	@Column({type: 'int', nullable: false, unsigned: true})
	public height: number;

	@Column({type: 'varchar', length: 100, nullable: true})
	public formats: string;

	@Column({type: 'varchar', length: 100, nullable: true})
	public hash: string;

	@Column({type: 'varchar', length: 100, nullable: true})
	public ext: string;

	@Column({type: 'text', nullable: false})
	public mime: string;

	// size in bytes
	@Column({type: 'int', nullable: false, unsigned: true})
	public size: number;

	@Column({type: 'text', nullable: false})
	public url: string;

	@Column({name: 'preview_url', type: 'text', nullable: false})
	public previewUrl: string;

	@Column({type: 'varchar', length: 255, nullable: true})
	public provider: string;

	@OneToMany((type) => CommerceMetadata, (meta) => meta.tableId)
	public providerMetadata: Metadata[];

	@Column({type: 'varchar', length: 255, nullable: true})
	public related: string;
}
