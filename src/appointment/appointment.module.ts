import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointment.service';
import { PatientAppointmentsController } from './appointment.controller';
import { Service } from 'src/service/service.entity';
import { ClientsService } from 'src/patient/patient.service';
import { Patient } from 'src/patient/patient.entity';

@Module({
  imports: [SequelizeModule.forFeature([Appointment, Service, Patient])],
  providers: [AppointmentsService],
  controllers: [PatientAppointmentsController],
})
export class PatientAppointmentsModule {}

