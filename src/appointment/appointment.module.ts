import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointment.service';
import { PatientAppointmentsController } from './appointment.controller';
import { Service } from 'src/service/service.entity';

@Module({
  imports: [SequelizeModule.forFeature([Appointment, Service])],
  providers: [AppointmentsService],
  controllers: [PatientAppointmentsController],
})
export class PatientAppointmentsModule {}

