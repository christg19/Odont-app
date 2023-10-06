import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DentalRecord } from './dental-record.entity';
import { DentalRecordService } from './dental-record.service';
import { DentalRecordController } from './dental-record.controller';

@Module({
  imports: [SequelizeModule.forFeature([DentalRecord])],
  providers: [DentalRecordService],
  controllers: [DentalRecordController],
})
export class DentalRecordModule {}

