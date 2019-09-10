import { Controller, Get, Post, UseGuards, Body, Request, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDTO } from './user/dto/user.dto';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    const userLoginDTO: UserLoginDTO = { email: req.body.username, password: req.body.password };

    const token = await this.authService.login(userLoginDTO);

    if (!token) {
      throw new UnauthorizedException();
    }
    
    return token;
  }

}
