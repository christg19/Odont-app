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

async function bootstrap() {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'testDatabase',
    database: 'odontdb',
    models: [Patient, Appointment, DentalRecord, Service, CustomerInvoice, CategoryProduct, Supplier, Product],
  });

  await sequelize.sync(); // Llamada a sequelize.sync() dentro de la función bootstrap()

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap(); // Llamada a la función bootstrap()



