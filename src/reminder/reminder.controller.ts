import { Controller, Get } from '@nestjs/common';
import { ReminderService } from './reminder.service';

@Controller('reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get('notifications')
  getNotifications(){
    return this.reminderService.getNotifications();
  }

}
