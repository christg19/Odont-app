import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notifiacion.entity';

@Injectable()
export class NotificationService {

    constructor(@InjectModel(Notification) private notificationModel: typeof Notification) { }

    async getNotifications(): Promise<Notification[]> {
        try {
            return this.notificationModel.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getNotification(id: number): Promise<Notification> {
        if (id >= 0) {
            throw new Error('El ID no es válido');
        }

        const notification: Notification = await this.notificationModel.findOne({
            where: {
                id: id
            }
        });

        if (!notification) {
            throw new NotFoundException('Notificación');
        }

        return notification;
    }

    async createNotification(dto: CreateNotificationDto) {
        try {
            this.notificationModel.create(dto);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateNotification(id, dto: UpdateNotificationDto) {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        }

        const notification: Notification = await this.notificationModel.findOne({
            where: {
                id: id
            }
        });

        if (!notification) {
            throw new NotFoundException('Notificación no encontrada');
        }

        await notification.update(dto);
        return 'La notificación fue actualizada correctamente';
    }

    async deleteNotification(id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        }

        const notification: Notification = await this.notificationModel.findOne({
            where: {
                id: id
            }
        });

        await notification.destroy();
        return 'La notificación fue eliminada correctamente';


    }


}
