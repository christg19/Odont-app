import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsController } from './patient.controller';
import { ClientsService } from './patient.service';
import { Patient } from './patient.entity';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class patientsModule {}

