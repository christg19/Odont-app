import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notifiacion.entity';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class NotificationService {

    private notificationSubject = new Subject<Notification[]>();

    constructor(@InjectModel(Notification) private notificationModel: typeof Notification) { }

    async sendReminder() {
       
     
    }


    getReminders(): Observable<Notification[]> {
        return this.notificationSubject.asObservable();
    }


    async getNotifications(page:number, limit:number): Promise<{items: Notification[], total:number}> {
        const offset = (page-1)*limit;
        try {
            const notification = await this.notificationModel.findAndCountAll({
                limit:limit,
                offset:offset
            });

            return {
                items: notification.rows,
                total: notification.count
            };
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
        this.notificationModel.create(dto).then(()=>{
            this.sendReminder();
        });
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
