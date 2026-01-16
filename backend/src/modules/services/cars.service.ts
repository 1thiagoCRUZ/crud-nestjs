import { Injectable, NotFoundException } from "@nestjs/common";
import { Car } from "../entities/cars.entity";
import { CreateCarDto } from "../dtos/cars/create-car.dto";
import { UpdateCarDto } from "../dtos/cars/update-car.dto";
import { CarsRepository } from "../repositories/cars.repository";
import { User } from "../entities/user.entity";

@Injectable()
export class CarsService {
    constructor(private readonly carsRepository: CarsRepository) { }
    async create(createCarDto: CreateCarDto, user: User): Promise<Car> {
        return this.carsRepository.create(createCarDto, user);
    }

    async findAll(): Promise<Car[]> {
        return this.carsRepository.findAll();
    }

    async findOne(id: number): Promise<Car> {
        const car = await this.carsRepository.findOne(id);
        if (!car) {
            throw new NotFoundException(`Carro com ID ${id} não encontrado.`);
        }
        
        return car;
    }

    async update(id: number, updateCarDto: UpdateCarDto): Promise<void> {
        await this.findOne(id); 
        return this.carsRepository.update(id, updateCarDto);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        return this.carsRepository.remove(id);
    }
}