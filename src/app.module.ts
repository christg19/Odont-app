import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { PatientAppointmentsModule } from './patient-appointments/patient-appointments.module';
import { DentalRecordModule } from './dental-record/dental-record.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username: 'root',
    password: 'testDatabase',
    database: 'odontdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true
  }), ClientsModule, PatientAppointmentsModule, DentalRecordModule],
  controllers: [],
  providers: [],
  exports:[ClientsModule]
})
export class AppModule {}
// docker run --name odontdb -e MYSQL_ROOT_PASSWORD=testDatabase MYSQL_DATABASE=odontdb -p 3306:3306 -d mysql:latest
