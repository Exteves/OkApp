import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserOrderDTO, UserLoginDTO } from 'src/user/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userLoginDTO: UserLoginDTO): Promise<UserOrderDTO> {
    const user = await this.authService.validateUser(userLoginDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}