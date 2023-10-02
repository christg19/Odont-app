import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { PatientAppointmentsModule } from './patient-appointments/patient-appointments.module';
import { UserAppointmentController } from './user-appointment/user-appointment.controller';
import { UserAppointmentService } from './user-appointment/user-appointment.service';
import { DentalRecordModule } from './dental-record/dental-record.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username: 'root',
    password: 'testDatabase',
    database: 'odotdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true
  }), ClientsModule, PatientAppointmentsModule, DentalRecordModule],
  controllers: [UserAppointmentController],
  providers: [UserAppointmentService],
})
export class AppModule {}
