import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('Stadium project')
      .setDescription('Stadium REST API')
      .setVersion('1.0')
      .addTag(
        'NESTJS, validation, swagger, guard, sequelize, pg, mailer, bot, sms, cookie',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
