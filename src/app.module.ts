import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DentalProcedureModule } from './dental-procedure/dental-procedure.module';
import { PatientAppointmentsModule } from './patient-appointments/patient-appointments.module';
import { UserAppointmentController } from './user-appointment/user-appointment.controller';
import { UserAppointmentService } from './user-appointment/user-appointment.service';

@Module({
  imports: [ClientsModule, DentalProcedureModule, PatientAppointmentsModule],
  controllers: [UserAppointmentController],
  providers: [UserAppointmentService],
})
export class AppModule {}
