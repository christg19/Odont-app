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

async function bootstrap() {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'testDatabase',
    database: 'odontdb',
    models: [Patient, Appointment, DentalRecord, Service, CustomerInvoice, CategoryProduct, Supplier, Product, User],
  //   sync: {
  //     force: true
  // }
  });

  await sequelize.sync(); 

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3000);
}

bootstrap(); 



