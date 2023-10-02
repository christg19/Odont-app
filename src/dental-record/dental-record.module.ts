import { Module } from '@nestjs/common';
import { DentalRecordController } from './dental-record.controller';
import { DentalRecordService } from './dental-record.service';

@Module({
  controllers: [DentalRecordController],
  providers: [DentalRecordService]
})
export class DentalRecordModule {}
