import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

    async getAll(): Promise<Order[]> {
        const orders = await this.orderModel.find().exec();
        return orders;
    }

    async get(orderId): Promise<Order> {
        const order = await this.orderModel.findById(orderId).exec();
        return order;
    }

    async add(orderDTO: CreateOrderDTO): Promise<Order> {
        const newOrder = await this.orderModel(orderDTO);
        return newOrder.save();
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
