import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './interfaces/stock.interface';
import { Model } from 'mongoose';
import { CreateStockDTO } from './dto/stock.dto';

@Injectable()
export class StockService {
    constructor(@InjectModel('Stock') private readonly stockModel: Model<Stock>) {}

    async getAll(): Promise<Stock[]> {
        const stocks = await this.stockModel.find().exec();
        return stocks;
    }

    async get(stockId): Promise<Stock> {
        const stock = await this.stockModel.findById(stockId).exec();
        return stock;
    }

    async add(stockDTO: CreateStockDTO): Promise<Stock> {
        const newStock = await this.stockModel(stockDTO);
        return newStock.save();
    }

    async update(stockId: string, stockDTO: CreateStockDTO): Promise<Stock> {
        const updatedStock = await this.stockModel.updateOne(stockId, stockDTO, { new: true });
        return updatedStock;
    }

    async delete(stockId: string): Promise<Stock> {
        const deletedStock = await this.stockModel.deleteOne(stockId);
        return deletedStock;
    }
}
