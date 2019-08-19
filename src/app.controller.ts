import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDTO } from './user/dto/user.dto';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @UseGuards(new LocalAuthGuard())
  async login(@Body() userLoginDTO: UserLoginDTO) {
    return this.authService.login(userLoginDTO);
  }
}
