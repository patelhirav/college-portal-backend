import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  server.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('College Management API')
    .setDescription('API for managing admins, users, and assignments')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(4000);
  console.log('Server running at http://localhost:4000');
}
bootstrap();
