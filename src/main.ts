import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { ApplicationLogger } from './framework/logger/application.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.useLogger(new ApplicationLogger());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
