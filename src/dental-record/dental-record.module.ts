import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentalRecordController } from './dental-record.controller';
import { DentalRecordService } from './dental-record.service';
import { DentalRecord } from './dental-record.entity'; 
import { Client } from 'src/clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DentalRecord, Client])], 
  providers: [DentalRecordService],
})
export class DentalRecordModule {}

