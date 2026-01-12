import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class UpdateCarDto {
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    urlImage: string;

    @IsInt()
    @Min(1886)
    year: number;

}