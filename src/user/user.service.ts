import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO, UserOrderDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async get(userId): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        return user;
    }

    async add(userDTO: CreateUserDTO): Promise<User> {
        const newUser = await this.userModel(userDTO);
        return newUser.save();
    }

    async update(userId: string, userDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.userModel.updateOne(userId, userDTO, { new: true });
        return updatedUser;
    }

    async delete(userId: string): Promise<User> {
        const deletedUser = await this.userModel.deleteOne(userId);
        return deletedUser;
    }

    async addOrderToUser(userId: string, orderId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        user.orders.push(orderId);
        await user.save();
        return user;
    }
}
