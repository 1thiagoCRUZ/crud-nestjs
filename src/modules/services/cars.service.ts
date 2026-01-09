import { Injectable, NotFoundException } from "@nestjs/common";
import { Car } from "../entities/cars.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCarDto } from "../dtos/create-car.dto";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private carsRepository: Repository<Car>,
    ) {}

    // criar carro
    async create(createCarDto: CreateCarDto): Promise<Car> {
        const car = this.carsRepository.create(createCarDto);
        return this.carsRepository.save(car);
    }

    // buscar todos
    async findAll(): Promise<Car[]> {
        return this.carsRepository.find();
    }

    // buscar pelo ID
    async findOne(id: number): Promise<Car> {
        const car = await this.carsRepository.findOneBy({ id });
        if (!car) {
            throw new NotFoundException(`Carro com ID ${id} não encontrado`);
        }
        return car;
    }
}