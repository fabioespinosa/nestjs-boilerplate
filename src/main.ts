import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { TransformInterceptor } from './transform.interceptor';

const APP_PORT = process.env.PORT || 3000;
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Notes app')
    .setDescription('The Notes API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('notes')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('api', app, document, customOptions);
  await app.listen(APP_PORT);
  logger.log(`Application listening on port: ${APP_PORT}`);
}
bootstrap();
