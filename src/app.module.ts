import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DentalProcedureModule } from './dental-procedure/dental-procedure.module';
import { PatientAppointmentsModule } from './patient-appointments/patient-appointments.module';

@Module({
  imports: [ClientsModule, DentalProcedureModule, PatientAppointmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
