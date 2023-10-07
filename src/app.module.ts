import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './patient/patient.entity';
import { Appointment } from './appointment/appointment.entity';
import { DentalRecord } from './dental-record/dental-record.entity';
import { Service } from './service/service.entity';
import { CustomerInvoice } from './customer-invoice/customer-invoice.entity';
import { patientsModule } from './patient/patient.module';
import { PatientAppointmentsModule } from './appointment/appointment.module';
import { DentalRecordModule } from './dental-record/dental-record.module';
import { CustomerInvoiceModule } from './customer-invoice/customer-invoice.module';
import { ServiceModule } from './service/service.module';
import { customerInvoiceController } from './customer-invoice/customer-invoice.controller';
import { CustomerInvoiceService } from './customer-invoice/customer-invoice.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'testDatabase',
      database: 'odontdb',
      models: [Patient, Appointment, DentalRecord, Service, CustomerInvoice],
    }),
    patientsModule,
    PatientAppointmentsModule,
    DentalRecordModule,
    ServiceModule,
    CustomerInvoiceModule
   
  ],
  controllers: [],
  providers: [],
  exports: [patientsModule], 
})

export class AppModule {}


// docker run --name odontdb -e MYSQL_ROOT_PASSWORD=testDatabase -e MYSQL_DATABASE=odontdb -p 3306:3306 -d mysql:latest

