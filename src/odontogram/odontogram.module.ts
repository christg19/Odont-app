import { Module } from '@nestjs/common';
import { Odontogram } from './odontogram.entity';
import { Patient } from 'src/patient/patient.entity';
import { OdontogramService } from './odontogram.service';
import { OdontogramController } from './odontogram.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tooth } from 'src/tooth/tooth.entity';
import { Procedure } from 'src/procedure/procedure.entity';

@Module({
    imports: [SequelizeModule.forFeature([Odontogram, Tooth, Procedure, Patient])],
    providers: [OdontogramService],
    controllers: [OdontogramController],
    exports: [OdontogramService]
  })
export class OdontogramModule {}
