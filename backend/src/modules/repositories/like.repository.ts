import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "../entities/like.entity";
import { Repository } from "typeorm";
import { Car } from "../entities/cars.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class LikesRepository {
    constructor(@InjectRepository(Like) private readonly repository: Repository<Like>) { }

    async findOne(userId: number, carId: number): Promise<Like | null> {
        return this.repository.findOneBy({ userId, carId });
    }

    async add(user: User, car: Car): Promise<Like> {
        const like = this.repository.create({ user, car });
        return this.repository.save(like);
    }

    async remove(like: Like): Promise<void> {
        await this.repository.remove(like);
    }

    async countByCar(carId: number): Promise<number> {
        return this.repository.countBy({ carId });
    }

    async findAllByUserId(userId: number): Promise<Like[]> {
        return this.repository.find({
            where: { userId },
            relations: ['car'],
        });
    }
}