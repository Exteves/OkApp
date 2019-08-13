import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Delete, Query, Put, HttpException } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post('/')
    async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        try {
            await this.productService.add(createProductDTO);
            return res.status(HttpStatus.CREATED).json();            
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getAll();
        if (!products) throw new NotFoundException('Não existem produtos cadastrados.');
        return res.status(HttpStatus.OK).json(products);
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productId') productId) {
        const product = await this.productService.get(productId);
        if(!product) throw new NotFoundException('Produto não existe.');
        return res.status(HttpStatus.OK).json(product);
    }

    @Put('/')
    async updateProduct(@Res() res, @Query('productId') productId, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.update(productId, createProductDTO);
        if(!product) throw new NotFoundException('Produto não existente.');
        return res.status(HttpStatus.OK).json();
    }

    @Delete('/:productID')
    async deleteProduct(@Res() res, @Param('productId') productId) {
        const product = await this.productService.delete(productId);
        if (!product) throw new NotFoundException('Produto não existente.');
        return res.status(HttpStatus.OK).json();
    }

}
