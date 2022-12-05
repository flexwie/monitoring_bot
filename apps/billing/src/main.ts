import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);

  const config = new DocumentBuilder()
    .setTitle('Billing API')
    .setDescription('Billing API for the Monitoring Telegram Bot')
    .setVersion('0.1')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  await app.listen(3001);
}
bootstrap();
