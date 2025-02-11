import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Procedure } from './procedure.entity';
import { ProcedureService } from './procedure.service';
import { ProcedureController } from './procedure.controller';

@Module({
    imports: [SequelizeModule.forFeature([Procedure])],
    providers: [ProcedureService],
    controllers: [ProcedureController],
  })
export class ProcedureModule {}
