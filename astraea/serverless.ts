import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  await app.init();
}

bootstrap();

export const handler = serverless(expressApp);
