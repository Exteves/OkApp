import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://omnistack:omnistack@cluster0-zcjna.mongodb.net/omnistack8?retryWrites=true&w=majority', { urlNewParser: true, useCreateIndex: true }),
    ProductModule,
    OrderModule,
    UserModule,
    StockModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
