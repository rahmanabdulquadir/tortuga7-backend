import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Tortuga 7 Backend System')
    .setDescription('Tortuga7 APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET);
  app.enableCors()
  SwaggerModule.setup('api', app, document); 
  await app.listen(process.env.PORT ?? 5432);
}
bootstrap();
