import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string válida' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'O email deve ser válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsOptional()
  @IsUrl({}, { message: 'A foto de perfil deve ser uma URL válida' })
  avatarUrl?: string;
}