import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from '../dtos/auth/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK) // Retorna 200 em vez de 201
    login(@Body() loginDto: AuthLoginDto) {
        return this.authService.login(loginDto);
    }
}