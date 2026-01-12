import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/cars.entity";
import { CarsController } from "./controllers/cars.controller";
import { CarsService } from "./services/cars.service";
import { CarsRepository } from "./repositories/cars.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Car])], // isso aqui registra a Entidade
    controllers: [CarsController],
    providers: [CarsService, CarsRepository]
})
export class CarsModule {}