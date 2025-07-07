import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>) {}

  async create(createSaleDto: CreateSaleDto, userId: string): Promise<Sale> {
    const createdSale = new this.saleModel({
      ...createSaleDto,
      userId,
      saleDate: new Date(),
    });
    return createdSale.save();
  }

  async findAllByUser(userId: string): Promise<Sale[]> {
    return this.saleModel.find({ userId }).exec();
  }
}
