import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Service } from './service.entity';


@Module({
  imports: [SequelizeModule.forFeature([Service])],
  providers: [ServiceService],
  controllers: [ServiceController],
  exports: [ServiceService]
})

export class ServiceModule {}
