import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './notifiacion.entity';

@Module({
  imports: [SequelizeModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
