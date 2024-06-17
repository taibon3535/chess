/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.VITE_SERVER_PORT || 3000;
  const hostname = process.env.VITE_SERVER_HOSTNAME ?? '';
  await app.listen(port, hostname);
  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${globalPrefix}`,
  );
}

bootstrap();
