import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
        ProductModule,
        UserModule
    ],
    providers: [
        OrderService,
    ],
    controllers: [
        OrderController
    ],

})
export class OrderModule {}
