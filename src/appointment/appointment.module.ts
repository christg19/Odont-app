import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointment.service';
import { PatientAppointmentsController } from './appointment.controller';
import { Service } from 'src/service/service.entity';
import { Patient } from 'src/patient/patient.entity';
import { Tooth } from 'src/tooth/tooth.entity';
import { Product } from 'src/product/product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Appointment, Service, Patient, Tooth, Product]),
    ProductModule, 
  ],
  providers: [AppointmentsService],
  controllers: [PatientAppointmentsController],
  exports: [AppointmentsService],
})
export class PatientAppointmentsModule {}
