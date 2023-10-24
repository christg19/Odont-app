import { Controller, Get } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('reminders')
@ApiTags('reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get('notifications')
  getNotifications(){
    return this.reminderService.getNotifications();
  }

}
