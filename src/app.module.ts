import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './patient/patient.entity';
import { Appointment } from './appointment/appointment.entity';
import { DentalRecord } from './dental-record/dental-record.entity';
import { patientsModule } from './patient/patient.module';
import { PatientAppointmentsModule } from './appointment/appointment.module';
import { DentalRecordModule } from './dental-record/dental-record.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'testDatabase',
      database: 'odontdb',
      models: [Patient, Appointment, DentalRecord],
    }),
    patientsModule,
    PatientAppointmentsModule,
    DentalRecordModule,
  ],
  controllers: [],
  providers: [],
  exports: [patientsModule], 
})
export class AppModule {}

// docker run --name odontdb -e MYSQL_ROOT_PASSWORD=testDatabase MYSQL_DATABASE=odontdb -p 3306:3306 -d mysql:latest
