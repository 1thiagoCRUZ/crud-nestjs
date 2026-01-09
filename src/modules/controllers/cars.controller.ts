import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CarsService } from "../services/cars.service";
import { CreateCarDto } from "../dtos/create-car.dto";
import { Car } from "../entities/cars.entity";

@Controller('cars')
export class CarsController {
    // injeção de dependencia do service
    constructor(private readonly carsService: CarsService) {}

    @Post()
    // usando o dto aqui para garantir que os dados venham corretos
    async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return this.carsService.create(createCarDto);
    }

    @Get()
    async findAll(): Promise<Car[]> {
        return this.carsService.findAll();
    }

    @Get(':id')
    // ParseIntPipe converte o 1 da url que vem como string num int automaticamente
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Car> {
        return this.carsService.findOne(id);
    }
}