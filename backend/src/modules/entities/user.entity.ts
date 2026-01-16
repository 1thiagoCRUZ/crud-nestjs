import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Car } from "./cars.entity";
import { Like } from "./like.entity";
import { Comment } from "./comment.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true, default: null })
    avatarUrl: string;

    @OneToMany(() => Car, (car) => car.user)
    cars: Car[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}