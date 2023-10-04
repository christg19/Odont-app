import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './appointment.entity';
import { PatientAppointmentsService } from './appointment.service';
import { PatientAppointmentsController } from './appointment.controller';

@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  providers: [PatientAppointmentsService],
  controllers: [PatientAppointmentsController],
})
export class PatientAppointmentsModule {}

