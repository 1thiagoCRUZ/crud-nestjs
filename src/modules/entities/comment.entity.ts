import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Car } from "./cars.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    content: string;

    @Column()
    userId: number;

    @Column()
    carId: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Car, (car) => car.comments)
    @JoinColumn({ name: 'carId' })
    car: Car;
}