import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class ProductItem {
  @Prop({ type: Types.ObjectId, ref: 'Product' }) // Explicitly define type
  productId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  quantity: number;
}

@Schema({ timestamps: true })
export class Sale extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [ProductItem], required: true }) // Define as array of ProductItem
  products: ProductItem[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, default: Date.now })
  saleDate: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
