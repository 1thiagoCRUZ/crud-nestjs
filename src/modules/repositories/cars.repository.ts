import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../entities/cars.entity";
import { Repository } from "typeorm";
import { CreateCarDto } from "../dtos/create-car.dto";
import { UpdateCarDto } from "../dtos/update-car.dto";

@Injectable()
export class CarsRepository {
    constructor(@InjectRepository(Car) private readonly repository: Repository<Car>) { }

    async findAll(): Promise<Car[]> {
        return this.repository.find();
    }

    // buscar pelo ID
    async findOne(id: number): Promise<Car> {
        const car = await this.repository.findOneBy({ id });
        if (!car) {
            throw new NotFoundException(`Carro com ID ${id} não encontrado`);
        }
        return car;
    }

    // criar carro
    async create(createCarDto: CreateCarDto): Promise<Car> {
        const car = this.repository.create(createCarDto);
        await this.repository.save(car);
        return car;
    }

    async update(id: number, carUpdateDto: UpdateCarDto): Promise<void> {
        await this.repository.update(id, carUpdateDto);
    }

    // remover um pelo ID
    async remove(id: number) {
        await this.repository.delete(id);
    }
}