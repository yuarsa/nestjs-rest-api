import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
    }),
  );
  await app.listen(3000, () => {
    console.log(
      `Database running on ${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
    );
  });
}
bootstrap();
