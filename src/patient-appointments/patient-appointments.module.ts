import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientAppointmentsController } from './patient-appointments.controller';
import { PatientAppointmentsService } from './patient-appointments.service';
import { Appointment } from './appointment.entity'; 
import { Client } from 'src/clients/client.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Client])], 
  controllers: [PatientAppointmentsController],
  providers: [PatientAppointmentsService],
})
export class PatientAppointmentsModule {}

