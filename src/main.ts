import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = app.get('ConfigService');
  const PORT = config.get('PORT');

  // NOTE - Move to configuration files
  const options = new DocumentBuilder()
    .setTitle('Quote Service')
    .setDescription('My personal quote API service')
    .setVersion('0.0.1') // WIP - pull from package.json
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // NOTE - Set port in configuration files
  await app.listen(PORT);
}
bootstrap();
