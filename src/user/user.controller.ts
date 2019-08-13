import { Controller, Post, Res, Body, HttpStatus, Get, NotFoundException, Param, Put, Query, Delete, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        try {
            await this.userService.add(createUserDTO);
            return res.status(HttpStatus.CREATED).json();            
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);            
        }
    }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getAll();
        if (!users) throw new NotFoundException('Não existem usuários cadastrados.');
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:userId')
    async getUser(@Res() res, @Param('userId') userId) {
        const user = await this.userService.get(userId);
        if(!user) throw new NotFoundException('Usuário não existe.');
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/')
    async updateUser(@Res() res, @Query('userId') userId, @Body() createUserDTO: CreateUserDTO) {
        const userDTO = await this.userService.update(userId, createUserDTO);
        if(!userDTO) throw new NotFoundException('Usuário não existente.');
        return res.status(HttpStatus.OK).json();
    }

    @Delete('/')
    async deleteUser(@Res() res, @Query('userId') userId) {
        const userDTO = await this.userService.delete(userId);
        if (!userDTO) throw new NotFoundException('Usuário não existente.');
        return res.status(HttpStatus.OK).json();
    }
}
