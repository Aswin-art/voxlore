import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { Request, Response } from 'express';
import { AppModule } from './app.module';

const server = express();
let isInitialized = false;

async function bootstrapServer() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.get('WEB_ORIGIN', true),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  await app.init();
  return app;
}

export default async function handler(req: Request, res: Response) {
  if (!isInitialized) {
    await bootstrapServer();
    isInitialized = true;
  }
  server(req, res);
}

if (!process.env.VERCEL) {
  void bootstrapServer().then((app) => {
    const config = app.get(ConfigService);
    const port = config.get('PORT', 3001);
    void app.listen(port, () => {
      console.log(`Application is running on port ${port}`);
    });
  });
}

