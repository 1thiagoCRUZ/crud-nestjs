import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Car } from "./cars.entity";
import { User } from "./user.entity";

@Entity('likes')

@Unique(['userId', 'carId'])
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    carId: number;

    // 1 like pertence a 1 user
    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({ name: 'userId' })
    user: User;

    // 1 like pertence a 1 carro
    @ManyToOne(() => Car, (car) => car.likes)
    @JoinColumn({ name: 'carId' })
    car: Car;
}