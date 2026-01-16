import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "../entities/comment.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dtos/comments/create-comment.dto";
import { Car } from "../entities/cars.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class CommentRepository {
    constructor(@InjectRepository(Comment) private readonly repository: Repository<Comment>) { }

    async create(createCommentDto: CreateCommentDto, car: Car, user: User): Promise<Comment> {
        const newComment = this.repository.create({
            ...createCommentDto,
            car: car,
            user: user
        });

        return this.repository.save(newComment);
    }

    async findByCarId(carId: number): Promise<Comment[]> {
        return this.repository.find({
            where: { carId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }

    async findAll(): Promise<Comment[]> {
        return this.repository.find();
    }
}