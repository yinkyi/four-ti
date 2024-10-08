import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filter/exception.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from './common/interceptors/response.interceptor';
import { FourTiLogService } from '@app/four-ti-log';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors();

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new FourTiLogService()));

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(new FourTiLogService()),
    new ResponseInterceptor(),
  );

  // base routing
  app.setGlobalPrefix('api');

  // swagger config
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('FourTi')
      .setDescription('welcome!')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  // app.use('/api/webhook', bodyParser.raw({ type: 'application/json' }));

  await app.listen(configService.get('PORT'));
}
bootstrap();
