import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = ProductS & Document;

@Schema()
export class ProductS {
  @Prop({ required: true })
  title: string;
  @Prop()
  desc: string;
  @Prop()
  price: number;
}
export const ProductSchema = SchemaFactory.createForClass(ProductS);
