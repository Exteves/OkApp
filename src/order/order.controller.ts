import { Controller, Post, Get, Put, Delete, Res, Body, Headers, Query, NotFoundException, HttpStatus, Param, HttpException, ForbiddenException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';
import { throwError } from 'rxjs';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }
    
    @Post('/')
    async addOrder(@Res() res, @Headers('token') token, @Body() createOrderDTO: CreateOrderDTO) {
        if (!token) {
            throw new ForbiddenException();
        }
        const order = await this.orderService.add(token, createOrderDTO);
        if (order === null) {
            throw new NotFoundException('Produtos não existentes para efetuar um pedido.');
        }
        return res.status(HttpStatus.CREATED).json();
    }

    @Get('/')
    async getOrders(@Res() res) {
        const orders = await this.orderService.getAll();
        if (!orders) throw new NotFoundException('Não existem pedidos cadastrados.');
        return res.status(HttpStatus.OK).json(orders);
    }

    @Get('/:orderId')
    async getOrder(@Res() res, @Param('orderId') orderId) {
        const order = await this.orderService.get(orderId);
        if(!order) throw new NotFoundException('Pedido não existe.');
        return res.status(HttpStatus.OK).json(order);
    }

    @Put('/')
    async updateOrder(@Res() res, @Query('orderId') orderId, @Body() createOrderDTO: CreateOrderDTO) {
        const orderDTO = await this.orderService.update(orderId, createOrderDTO);
        if(!orderDTO) throw new NotFoundException('Pedido não existente.');
        return res.status(HttpStatus.OK).json();
    }

    @Delete('/')
    async deleteOrder(@Res() res, @Query('orderId') orderId) {
        const orderDTO = await this.orderService.delete(orderId);
        if (!orderDTO) throw new NotFoundException('Pedido não existente.');
        return res.status(HttpStatus.OK).json();
    }
}
