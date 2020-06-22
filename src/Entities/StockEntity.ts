import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'commerce_product_stock'})
export default class CommerceProductStock {
	@PrimaryGeneratedColumn('increment', {type: 'bigint', unsigned: true})
	public id: number;

	@Column({
		name: 'stock_count',
		type: 'float',
		unsigned: false,
		nullable: false,
		default: 0.0,
	})
	public stockCount: number | 0.0;

	@Column({name: 'can_backorder', nullable: false, default: false})
	public canBackorder: boolean;

	@Column({
		name: 'low_stock_threshold',
		type: 'int',
		nullable: false,
		default: 0,
		unsigned: false,
	})
	public lowStockThreshold: number | 0;

	/**
	 * Stock Size is count of how many of these 'Stocks'
	 * are subtracted from the total stocks per item.
	 * E.g. Purchase 8 Item-X's where each Item-X is **25% (0.25)** of 1 stock,
	 * Therefore the new stock is **STOCK - (8 * 0.25) = STOCK - 2**
	 */
	@Column({
		name: 'parent_stock_denomination',
		type: 'float',
		nullable: false,
		default: 1.0,
		unsigned: true,
	})
	public stockSize: number | 1.0;

	@Column({name: 'manage_stock', default: false, nullable: false})
	public manageStock: boolean;

	@Column({name: 'in_stock', default: false, nullable: false})
	public inStock: boolean;
}
