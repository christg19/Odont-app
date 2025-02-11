import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsController } from './notification.controller';
import { Notification } from './notifiacion.entity';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [SequelizeModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService], 
})
export class NotificationModule {}
