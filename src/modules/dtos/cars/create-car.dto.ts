import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Min } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty({ message: 'A marca é obrigatória' })
  brand: string;

  @IsString()
  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  model: string;

  @IsInt({ message: 'O ano deve ser um número inteiro' })
  @Min(1886, { message: 'Ano inválido (o primeiro carro foi criado em 1886)' })
  year: number;

  @IsUrl({}, { message: 'A imagem deve ser uma URL válida (http://...)' })
  @IsNotEmpty({ message: 'A foto do carro é obrigatória para o post' })
  urlImage: string;

  @IsOptional()
  @IsString()
  description?: string;
}