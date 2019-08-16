import { Controller, Get, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDTO } from './user/dto/user.dto';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    const teste = await this.authService.validateUser(userLoginDTO);
    console.log(teste);
    return this.authService.login(userLoginDTO);
  }
}
