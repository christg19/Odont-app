import { Controller, Get, Patch } from '@nestjs/common';
import { AppointmentSubject, NotificationsService } from 'src/notification/notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getNotifications() {
    return this.notificationsService.getCurrentNotifications();
  }

  @Get('debug')
debugNotifications(): AppointmentSubject[] {
  return this.notificationsService.getCurrentNotifications();
}

  @Patch('mark-as-read')
  async markAllAsRead(): Promise<void> {
    await this.notificationsService.markAllAsRead();
  }
}
