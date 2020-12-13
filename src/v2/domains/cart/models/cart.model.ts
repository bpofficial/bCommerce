import { AggregateRoot } from "@nestjs/cqrs";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Cart extends AggregateRoot {
	@PrimaryGeneratedColumn("uuid")
	guid: string;

	@Column({ nullable: true })
	customer: number | null;

	@ManyToMany(() => Cart, { nullable: true })
	@JoinTable({
		inverseJoinColumn: {
			name: "cartItemId",
		},
		joinColumn: {
			name: "cartId",
		},
	})
	items: Cart[] | null;

	@Column({ default: false })
	abandoned: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
