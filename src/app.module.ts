import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/config/db';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CarsModule,
  ],
})
export class AppModule {}
