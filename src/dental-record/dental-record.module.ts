import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DentalRecord } from './dental-record.entity';
import { DentalRecordService } from './dental-record.service';
import { DentalRecordController } from './dental-record.controller';
import { Patient } from 'src/patient/patient.entity';
import { Appointment } from 'src/appointment/appointment.entity';

@Module({
  imports: [SequelizeModule.forFeature([DentalRecord, Patient, Appointment])],
  providers: [DentalRecordService],
  controllers: [DentalRecordController],
})
export class DentalRecordModule {}

