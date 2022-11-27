import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Followings app API')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      exposeDefaultValues: true,
    },
  }));

  await app.listen(3000);
}
bootstrap();
