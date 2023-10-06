import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerInvoice } from './customer-invoice.entity';
import { customerInvoiceController } from './customer-invoice.controller';
import { CustomerInvoiceService } from './customer-invoice.service';
import { Patient } from 'src/patient/patient.entity';
import { Appointment } from 'src/appointment/appointment.entity';



@Module({
  imports: [SequelizeModule.forFeature([CustomerInvoice, Patient, Appointment])],
  providers: [CustomerInvoiceService],
  controllers: [customerInvoiceController],
})
export class CustomerInvoiceModule {}
