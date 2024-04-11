import { Module } from '@nestjs/common';
import { DuesService } from './dues.service';
import { DuesController } from './dues.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dues } from './dues.entity';
import { Patient } from 'src/patient/patient.entity';
import { Service } from 'src/service/service.entity';

@Module({
  imports: [SequelizeModule.forFeature([Dues, Patient, Service])],
  providers: [DuesService],
  controllers: [DuesController]
})
export class DuesModule {}
