import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsController } from './patient.controller';
import { ClientsService } from './patient.service';
import { Patient } from './patient.entity';
import { CustomerInvoice } from 'src/customer-invoice/customer-invoice.entity';
import { Service } from 'src/service/service.entity';
import { Dues } from 'src/dues/dues.entity';
import { Odontogram } from 'src/odontogram/odontogram.entity';

@Module({
  imports: [SequelizeModule.forFeature([Patient, CustomerInvoice, Service, Dues, Odontogram])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class patientsModule {}

