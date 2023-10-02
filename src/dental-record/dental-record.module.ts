import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentalRecordService } from './dental-record.service';
import { DentalRecord } from './dental-record.entity'; 
import { Client } from 'src/clients/client.entity';
import { DentalRecordController } from './dental-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DentalRecord, Client])],
  controllers: [DentalRecordController],
  providers: [DentalRecordService],
})
export class DentalRecordModule {}

