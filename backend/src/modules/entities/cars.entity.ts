import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Like } from "./like.entity";
import { Comment } from "./comment.entity";
@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    urlImage: string;

    @Column()
    year: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.cars)
    @JoinColumn({ name: 'userId' }) // define chave estrangeira
    user: User;

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}