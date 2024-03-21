import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { Patient } from './patient/patient.entity';
import { Appointment } from './appointment/appointment.entity';
import { DentalRecord } from './dental-record/dental-record.entity';
import { ValidationPipe } from '@nestjs/common';
import { Service } from './service/service.entity';
import { CustomerInvoice } from './customer-invoice/customer-invoice.entity';
import { CategoryProduct } from './category-product/category-product.entity';
import { Supplier } from './supplier/supplier.entity';
import { Product } from './product/product.entity';
import { User } from './users/user.entity';
import { Notification } from './notification/notifiacion.entity';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const sequelize = app.get(Sequelize); // Obtiene la instancia de Sequelize
  await sequelize.sync(); // Forzar la sincronización
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Odont App Documentation')
    .setDescription('The Odont App Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3000);
}

bootstrap();



