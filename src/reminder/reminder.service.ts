import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from 'src/notification/notifiacion.entity';

@Injectable()
export class ReminderService {

  constructor(@InjectModel(Notification) private notificationModel: typeof Notification) { }

  async getNotifications(): Promise<Notification[]> {
    const thisDay = new Date();

    const notifications: Notification[] = await this.notificationModel.findAll();
    const filteredNotifications: Notification[] = notifications.filter(notis => {
      const notisDate: Date = new Date(notis.pendingDate);
      const isSameYear: boolean = notisDate.getFullYear() === thisDay.getFullYear();
      const isSameMonth: boolean = notisDate.getMonth() === thisDay.getMonth();
      const isSameDay: boolean = notisDate.getDate() === thisDay.getDate();

      return isSameYear && isSameMonth && isSameDay;
    });

    return filteredNotifications;
  }


}
