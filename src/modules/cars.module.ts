import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/cars.entity";
import { CarsController } from "./controllers/cars.controller";
import { CarsService } from "./services/cars.service";
import { CarsRepository } from "./repositories/cars.repository";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Car]), AuthModule], // isso aqui registra a Entidade
    controllers: [CarsController],
    providers: [CarsService, CarsRepository],
    exports: [CarsRepository]
})
export class CarsModule {}