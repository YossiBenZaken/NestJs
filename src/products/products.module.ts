import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductS, ProductSchema } from 'src/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductS.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
