import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorResponseDto } from './common/dto/error-response-dto';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Planly')
    .setDescription(
      'Planly helps teams organize projects, track tasks with flexible workflows, and collaborate efficiently. Features include JWT authentication, role-based access, task assignment, comments, file attachments, status workflows, and background reminders.',
    )
    .setVersion('1.0')
    .addGlobalResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request - validation failed',
      type: ErrorResponseDto,
    })
    .addGlobalResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
      type: ErrorResponseDto,
    })
    .addGlobalResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      type: ErrorResponseDto,
    })
    .addBearerAuth({ type: 'http' }, 'bearer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('❌ Bootstrap error:', error);
  process.exit(1);
});
