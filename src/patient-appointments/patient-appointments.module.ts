import { Module } from '@nestjs/common';
import { PatientAppointmentsController } from './patient-appointments.controller';
import { PatientAppointmentsService } from './patient-appointments.service';

@Module({
  controllers: [PatientAppointmentsController],
  providers: [PatientAppointmentsService]
})
export class PatientAppointmentsModule {}
