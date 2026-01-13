import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthLoginDto } from '../dtos/auth/auth-login.dto';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: AuthLoginDto) {
        const user = await this.usersService.findByEmailForAuth(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const payload = { sub: user.id, email: user.email, name: user.name };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}