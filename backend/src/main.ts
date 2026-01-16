import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
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

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(port);

  logger.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
