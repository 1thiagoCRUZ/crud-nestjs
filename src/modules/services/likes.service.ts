import { Injectable, NotFoundException } from '@nestjs/common';
import { LikesRepository } from '../repositories/like.repository';
import { CarsRepository } from '../repositories/cars.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class LikesService {
    constructor(
        private readonly likesRepository: LikesRepository,
        private readonly carsRepository: CarsRepository,
    ) { }

    async toggleLike(carId: number, user: User) {
        const car = await this.carsRepository.findOne(carId);
        if (!car) {
            throw new NotFoundException('Carro não encontrado');
        }

        const existingLike = await this.likesRepository.findOne(user.id, carId);

        if (existingLike) {
            await this.likesRepository.remove(existingLike);
            return { status: 'unliked', message: 'Like removido' };
        } else {
            await this.likesRepository.add(user, car);
            return { status: 'liked', message: 'Like adicionado' };
        }
    }

    async findUserLikes(userId: number) {
        return this.likesRepository.findAllByUserId(userId);
    }
}