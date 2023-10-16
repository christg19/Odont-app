import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { NotificationModule } from 'src/notification/notification.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from 'src/notification/notifiacion.entity';

@Module({
  imports: [SequelizeModule.forFeature([Notification, NotificationModule])],
  controllers: [ReminderController],
  providers: [ReminderService]
})
export class ReminderModule {}
