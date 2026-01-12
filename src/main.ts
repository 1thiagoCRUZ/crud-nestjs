import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config do swagger
  const config = new DocumentBuilder()
  .setTitle('CRUD Cars')
  .setDescription('Uma API para gerenciar carros')
  .setVersion('1.0') // n sei pq dessa versao na documentação tava assim
  .addTag('cars')
  .build();

  const documentFactory = ()=> SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
