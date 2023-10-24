import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @Get('notifications/:page/:limit')
    getNotifications(@Param('page') page:number, @Param('limit') limit:number) {
        return this.notificationService.getNotifications(page, limit)
    }

    @Get('notification/:id')
    getNotification(@Param('id') id: number) {
        return this.notificationService.getNotification(id)
    }


    @Post('notification')
    createNotification(@Body() newNotification: CreateNotificationDto) {
        return this.notificationService.createNotification(newNotification)
    }

    @Put('notification/:id')
    updateNotification(@Param('id') id: number, @Body() updateNotification: UpdateNotificationDto) {
        return this.notificationService.updateNotification(id, updateNotification)
    }

    @Delete('notification/:id')
    deleteNotification(@Param('id') id: number) {
        return this.notificationService.deleteNotification(id)
    }

}
