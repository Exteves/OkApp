import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserOrderDTO, UserLoginDTO } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(userLoginDTO: UserLoginDTO): Promise<UserOrderDTO> {
        const user = await this.userService.getByEmail(userLoginDTO.email);
        if (user) {
            const match = await bcrypt.compare(userLoginDTO.password, user.password);
            if (match) {
                return user;
            }
            return null;
        }
        return null;
    }

    async login(userLoginDTO: UserLoginDTO) {
        const user = await this.userService.getByEmail(userLoginDTO.email);

        if (user) {
            const payload = {
                username: user.email,
                sub: user._id
            };
            return {
                access_token: this.jwtService.sign(payload)
            }
        }

        return null;
    }
}
