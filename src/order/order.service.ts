import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDTO } from './dto/order.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        private productService: ProductService,
        private userService: UserService,
    ) {}

    async getAll(): Promise<Order[]> {
        const orders = await this.orderModel.find().exec();
        return orders;
    }

    async get(orderId): Promise<Order> {
        const order = await this.orderModel.findById(orderId).exec();
        return order;
    }

    async add(userId: string, orderDTO: CreateOrderDTO): Promise<Order> {
        const newOrder = await this.orderModel(orderDTO);
        if (newOrder && newOrder.products.length > 0) {
            const orderUser = await this.userService.addOrderToUser(userId, newOrder._id);           
            return newOrder.save();            
        }
        return null;
    }

    async update(orderId, orderDTO: CreateOrderDTO): Promise<Order> {
        const updatedOrder = await this.orderModel.updateOne(orderId, orderDTO, { new: true });
        return updatedOrder;
    }

    async delete(orderId): Promise<Order> {
        const deletedOrder = await this.orderModel.deleteOne(orderId);
        return deletedOrder;
    }
}
