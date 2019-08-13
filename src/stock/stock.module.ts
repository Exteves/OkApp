import { Module } from '@nestjs/common';
import { StockSchema } from './schemas/stock.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Stock', schema: StockSchema}])
    ],
    providers: [
      StockService
    ],
    controllers: [
      StockController
    ]
})
export class StockModule {}
