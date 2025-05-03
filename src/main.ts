import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Tortuga 7 Backend System')
    .setDescription('Tortuga7 APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that don't have decorators
      forbidNonWhitelisted: false, // throws error on unknown properties
      transform: true, // transforms payloads to match DTO types
      transformOptions: {
        enableImplicitConversion: true, // allows auto conversion (e.g., string to number)
      },
    }),
  );
  SwaggerModule.setup('api', app, document); 
  await app.listen(process.env.PORT ?? 5432);
}
bootstrap();
