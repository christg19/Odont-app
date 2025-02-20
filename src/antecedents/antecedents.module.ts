import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AntecedentsController } from './antecedents.controller';
import { AntecedentsService } from './antecedents.service';
import { Antecedent } from './antecedents.entity';

@Module({
  imports: [SequelizeModule.forFeature([Antecedent])],
  controllers: [AntecedentsController],
  providers: [AntecedentsService],
  exports: [AntecedentsService],
})
export class AntecedentsModule {}
