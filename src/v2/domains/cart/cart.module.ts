import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./models/cart.model";

@Module({
	imports: [TypeOrmModule.forFeature([Cart])],
})
export class CartModule {}
