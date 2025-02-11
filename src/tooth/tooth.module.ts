import { Module } from '@nestjs/common';
import { ToothService } from './tooth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tooth } from './tooth.entity';
import { Odontogram } from 'src/odontogram/odontogram.entity';
import { Procedure } from 'src/procedure/procedure.entity';
import { ToothController } from './tooth.controller';

@Module({
  imports: [SequelizeModule.forFeature([Tooth, Odontogram, Procedure])],
  providers: [ToothService],
  controllers: [ToothController],
  exports: [ToothService],
})
export class ToothModule {}
