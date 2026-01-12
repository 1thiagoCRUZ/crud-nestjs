import { Injectable, NotFoundException } from "@nestjs/common";
import { Car } from "../entities/cars.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCarDto } from "../dtos/create-car.dto";
import { CarsRepository } from "../repositories/cars.repository";
import { UpdateCarDto } from "../dtos/update-car.dto";

@Injectable()
export class CarsService {
    constructor(private readonly carsRepository: CarsRepository) { }

    async create(createCarDto: CreateCarDto): Promise<Car> {
        return this.carsRepository.create(createCarDto);
    }

    async findAll(): Promise<Car[]> {
        return this.carsRepository.findAll();
    }

    async findOne(id: number): Promise<Car> {
        return this.carsRepository.findOne(id);
    }

    async update(id: number, updateCarDto: UpdateCarDto): Promise<void> {
        return this.carsRepository.update(id, updateCarDto);
    }

    async remove(id: number): Promise<void> {
        return this.carsRepository.remove(id);
    }
}