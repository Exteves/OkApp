import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getAll(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products;
    }

    async get(productId): Promise<Product> {
        const product = await this.productModel.findById(productId).exec();
        return product;
    }

    async add(createProductDTO: CreateProductDTO): Promise<Product> {
        const newProduct = await this.productModel(createProductDTO);
        return newProduct.save();
    }

    async update(productId, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, createProductDTO, { new: true });
        return updatedProduct;
    }

    async delete(productId): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndRemove(productId);
        return deletedProduct;
    }
}
