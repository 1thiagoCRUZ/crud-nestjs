import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}