import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentRepository } from "../repositories/comment.repository";
import { CreateCommentDto } from "../dtos/comments/create-comment.dto";
import { User } from "../entities/user.entity";
import { Comment } from "../entities/comment.entity";
import { CarsRepository } from "../repositories/cars.repository";

@Injectable()
export class CommentsService {
    constructor(private readonly commentsRepository: CommentRepository, private readonly carsRepository: CarsRepository) { }
    async create(createCommentDto: CreateCommentDto, carId: number, user: User): Promise<Comment> {
        const car = await this.carsRepository.findOne(carId);
        if (!car) throw new NotFoundException('Carro não existe!');
        return this.commentsRepository.create(createCommentDto, car, user);
    }

    async findAll(): Promise<Comment[]> {
        return this.commentsRepository.findAll();
    }

    async findByCarId(carId: number): Promise<Comment[]> {
        const car = await this.carsRepository.findOne(carId);
        if (!car) throw new NotFoundException('Carro não existe!');
        return this.commentsRepository.findByCarId(carId);
    }

}