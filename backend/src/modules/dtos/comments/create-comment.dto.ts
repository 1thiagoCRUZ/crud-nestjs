import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'O comentário não pode ser vazio' })
  @MinLength(2, { message: 'O comentário deve ter pelo menos 2 caracteres' })
  @MaxLength(500, { message: 'O comentário não pode ter mais de 500 caracteres' })
  content: string;
}