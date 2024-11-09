import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // Allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  

  const config = new DocumentBuilder()
    .setTitle('workshop')
    .setDescription('The workshop API')
    .setVersion('1.0')
    .addTag('workshop nestjs')
    .addBearerAuth(
      { 
          type: 'http', 
          scheme: 'bearer', 
          bearerFormat: 'JWT' 
      },
      'access_token',
  )
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
