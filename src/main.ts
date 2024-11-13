import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appController = app.get(AppController);
  const swaggerConf = new DocumentBuilder()
        .setTitle('Outsera Assessment API')
        .setDescription('Documentation for Outsera Assessment API')
        .setVersion('1.0')
        .build(); 
  const document = SwaggerModule.createDocument(app, swaggerConf);  
  SwaggerModule.setup('/doc', app, document);  
  await appController.initializeDatabase();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
