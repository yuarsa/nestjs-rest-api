import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http.filter';
import { ValidationException } from './common/exception/validation.exception';
import { ValidationFilter } from './common/exception/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors) => {
        let errorMessages = [];
        errors.forEach((error, index) => {
          errorMessages[index] = {
            field: error.property,
            message: Object.values(error.constraints).join('. ').trim(),
          };
        });

        return new ValidationException(errorMessages);
      },
    }),
  );

  await app.listen(3000, () => {
    console.log(
      `Database running on ${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
    );
  });
}
bootstrap();
