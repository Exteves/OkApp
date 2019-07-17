import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find.exec();
        return users;
    }

    async get(userId: number): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        return user;
    }

    async add(userDTO: CreateUserDTO): Promise<User> {
        const newUser = await this.userModel(userDTO);
        return newUser.save();
    }

    async update(userId: number, userDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, userDTO, { new: true });
        return updatedUser;
    }

    async delete(userId: number): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndRemove(userId);
        return deletedUser;
    }
}
