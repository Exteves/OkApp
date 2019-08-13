import { Controller, Post, Res, Body, HttpStatus, Get, NotFoundException, Param, Put, Query, Delete, HttpException } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDTO } from './dto/stock.dto';

@Controller('stock')
export class StockController {
    constructor(private stockService: StockService) {}

    @Post('/')
    async add(@Res() res, @Body() createStockDTO: CreateStockDTO) {
        try {
            await this.stockService.add(createStockDTO);
            return res.status(HttpStatus.CREATED).json();            
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/')
    async getStocks(@Res() res) {
        const stocks = await this.stockService.getAll();
        if(!stocks) throw new NotFoundException('Não existem estoques!');
        return res.status(HttpStatus.OK).json(stocks);
    }

    @Get('/:stockId')
    async getStock(@Res() res, @Param('stockId') stockId) {
        const stock = await this.stockService.get(stockId);
        if(!stock) throw new NotFoundException('Estoque não encontrado');
        return res.status(HttpStatus.OK).json(stock);
    }

    @Put('/')
    async updateStock(@Res() res, @Query('stockId') stockId, @Body() createStockDTO: CreateStockDTO) {
        const stockDTO = await this.stockService.update(stockId, createStockDTO);
        if(!stockDTO) throw new NotFoundException('Estoque não encontrado.');
        return res.status(HttpStatus.OK).json(); 
    }
    
    @Delete('/')
    async deleteStock(@Res() res, @Query('stockId') stockId) {
        const stockDTO = await this.stockService.delete(stockId);
        if (!stockDTO) throw new NotFoundException('Usuário não existente.');
        return res.status(HttpStatus.OK).json();
    }
}
