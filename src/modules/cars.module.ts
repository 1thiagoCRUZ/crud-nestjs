import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/cars.entity";
import { CarsController } from "./controllers/cars.controller";
import { CarsService } from "./services/cars.service";

@Module({
    imports: [TypeOrmModule.forFeature([Car])], // isso aqui registra a Entidade
    controllers: [CarsController],
    providers: [CarsService]
})
export class CarsModule {}