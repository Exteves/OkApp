import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products;
    }

    async getProduct(productId): Promise<Product> {
        const product = await this.productModel.findById(productId).exec();
        return product;
    }

    async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const newProduct = await this.productModel(createProductDTO);
        return newProduct.save();
    }

    async updateProduct(productId, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, createProductDTO, { new: true });
        return updatedProduct;
    }

    async deleteProduct(productId): Promise<any> {
        const deletedProduct = await this.productModel.findByIdAndRemove(productId);
        return deletedProduct;
    }
}
