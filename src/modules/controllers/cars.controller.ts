import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CarsService } from "../services/cars.service";
import { CreateCarDto } from "../dtos/create-car.dto";
import { Car } from "../entities/cars.entity";
import { UpdateCarDto } from "../dtos/update-car.dto";

@Controller('cars')
export class CarsController {
    // injeção de dependencia do service
    constructor(private readonly carsService: CarsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED) // Isso aqui serve pra retornar um código http especifico, pra criado por ex seria 201
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

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCarDto: UpdateCarDto): Promise<void> {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.remove(id);
    }
}