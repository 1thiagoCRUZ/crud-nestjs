import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CarsService } from "../services/cars.service";
import { CreateCarDto } from "../dtos/cars/create-car.dto";
import { Car } from "../entities/cars.entity";
import { UpdateCarDto } from "../dtos/cars/update-car.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../entities/user.entity";

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createCarDto: CreateCarDto, @Req() req) {
        return this.carsService.create(createCarDto, req.user);
    }

    @Get()
    findAll() {
        return this.carsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCarDto: UpdateCarDto) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.remove(id);
    }
}