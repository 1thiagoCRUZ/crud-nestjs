import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/config/db';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CarsModule,
    UsersModule,
    AuthModule,
    JwtModule,
  ],
})
export class AppModule { }
