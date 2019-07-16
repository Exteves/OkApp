import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post('/')
    async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        await this.productService.addProduct(createProductDTO);
        return res.status(HttpStatus.CREATED).json();
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getAllProducts();
        if (!products) throw new NotFoundException('Não existem produtos cadastrados.');
        return res.status(HttpStatus.OK).json(products);
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productId') productId) {
        const product = await this.productService.getProduct(productId);
        if(!product) throw new NotFoundException('Produto não existe.');
        return res.status(HttpStatus.OK).json(product);
    }

    @Put('/')
    async updateProduct(@Res() res, @Query('productId') productId, @Body() CreateProductDTO: CreateProductDTO) {
        const product = await this.productService.updateProduct(productId, CreateProductDTO);
        if(!product) throw new NotFoundException('Produto não existente.');
        return res.status(HttpStatus.OK);
    }

    @Delete('/')
    async deleteProduct(@Res() res, @Query('productId') productId) {
        const product = await this.productService.deleteProduct(productId);
        if (!product) throw new NotFoundException('Produto não existente.');
        return res.status(HttpStatus.OK);
    }

}
