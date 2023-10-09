import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsController } from './patient.controller';
import { ClientsService } from './patient.service';
import { Patient } from './patient.entity';
import { CustomerInvoice } from 'src/customer-invoice/customer-invoice.entity';
import { Service } from 'src/service/service.entity';

@Module({
  imports: [SequelizeModule.forFeature([Patient, CustomerInvoice, Service])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class patientsModule {}

