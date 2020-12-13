import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import CommerceComment from './CommentEntity';
import CommerceMedia from './MediaEntity';
import CommerceMetadata from './MetadataEntity';
import CommerceProductAttribute from './ProductAttributeEntity';
import CommerceProductStock from './StockEntity';
import CommerceTerm from './TermEntity';

@Entity({name: 'commerce_products'})
export default class CommerceProduct {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	@Index()
	public id: number;

	@Column({name: 'parent_id', type: 'bigint', unsigned: true, nullable: true})
	public parentId: number | null;

	@Column({type: 'varchar', length: 100, nullable: false, unique: true})
	public name: string;

	@Column({type: 'varchar', length: 30, nullable: true, unique: true})
	public sku: string | null;

	@Column({type: 'int', unsigned: true, nullable: false})
	public price: number;

	@Column({
		name: 'sale_price',
		type: 'int',
		unsigned: true,
		nullable: true,
	})
	public salePrice: number | null;

	@Column({
		name: 'long_description',
		type: 'text',
		nullable: false,
	})
	public longDescription: string;

	@Column({
		name: 'short_description',
		type: 'text',
		nullable: false,
	})
	public shortDescription: string;

	@OneToOne((type) => CommerceMedia)
	@JoinColumn({name: 'image_id'})
	public image: CommerceMedia;

	@ManyToMany((type) => CommerceMedia)
	public gallery: CommerceMedia[];

	@OneToMany((type) => CommerceProduct, (product) => product.parentId)
	public variations: CommerceProduct[];

	@ManyToMany((type) => CommerceProductAttribute)
	public attributes: CommerceProductAttribute[];

	@ManyToMany((type) => CommerceTerm)
	public categories: CommerceTerm[];

	@ManyToMany((type) => CommerceComment)
	public reviews: CommerceComment[];

	@ManyToMany((type) => CommerceTerm)
	public tags: CommerceTerm[];

	@OneToMany((type) => CommerceMetadata, (meta) => meta.tableId)
	public metadata: CommerceMetadata[];

	@OneToOne((type) => CommerceProductStock)
	@JoinColumn({name: 'stock_id'})
	public stock: CommerceProductStock;

	@CreateDateColumn({name: 'date_created'})
	public dateCreated: Date;

	@UpdateDateColumn({name: 'date_modified'})
	public dateModified: Date;
}
