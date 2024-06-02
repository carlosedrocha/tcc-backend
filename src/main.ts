import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as AWS from 'aws-sdk';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/');

  const configService = app.get(ConfigService);

  const awsAccessKeyId = configService.get('AWS_ACCESS_KEY_ID');
  const awsSecretAccessKey = configService.get('AWS_SECRET_ACCESS_KEY');
  const awsRegion = configService.get('AWS_REGION');

  if (!awsAccessKeyId || !awsSecretAccessKey || !awsRegion) {
    throw new Error('AWS credentials are not set in environment variables');
  }

  AWS.config.update({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: awsRegion,
    apiVersion: 'latest',
    maxRetries: 3,
    httpOptions: { timeout: 30000, connectTimeout: 5000 },
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  await app.listen(3333);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
});
