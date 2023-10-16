import { Test, TestingModule } from '@nestjs/testing';
import { ReminderService } from 'src/reminder/reminder.service';
import { Notification } from 'src/notification/notifiacion.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/dto';

describe('ReminderService', () => {
  let service: NotificationService;
  let service1: ReminderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderService],
    }).compile();

    service1 = module.get<ReminderService>(ReminderService);
  });

  it('should emit notifications', (done) => {
    const notifications: CreateNotificationDto[] = [
      {
        title: "Prueba",
        description: "Prueba",
        pendingDate: new Date("2023-10-13T03:36:00.000Z"),
      }, {
        title: "Prueba",
        description: "Prueba",
        pendingDate: new Date("2023-10-13T03:36:00.000Z"),
      }
    ];

    service.getReminders().subscribe((emittedNotifications) => {
      // Verifica que las notificaciones emitidas sean las mismas que las proporcionadas
      expect(emittedNotifications).toEqual(notifications);
      done();
    });

    // Emite las notificaciones
    service.sendReminder();
  });
});