import { Injectable, Logger } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppointmentSubject {
  patientName: string;
  date: string;
  seen: boolean;
  type: 'upcoming' | 'completed';
}

@Injectable()
export class NotificationsService {
  private appointmentSubject = new BehaviorSubject<AppointmentSubject[]>([]);
  private readonly logger = new Logger(NotificationsService.name);

  private notificationStorage: AppointmentSubject[] = [];

  addNotification(notification: AppointmentSubject): void {
    const currentList = this.appointmentSubject.getValue();
    const exists = currentList.some(
      (n) =>
        n.patientName === notification.patientName &&
        new Date(n.date).getTime() === new Date(notification.date).getTime() &&
        n.type === notification.type 
    );
  
    if (!exists) {
      this.notificationStorage.push(notification); 
      this.appointmentSubject.next([
        ...currentList,
        { ...notification, seen: false },
      ]);
    }
  }

  getPersistentNotifications(): AppointmentSubject[] {
    return this.notificationStorage; 
  }
  
  async markAllAsRead(): Promise<void> {
    const currentList = this.appointmentSubject.getValue();
    const updatedList = currentList.map((notification) => ({
      ...notification,
      seen: true, 
    }));
    this.appointmentSubject.next(updatedList);
  }
  
  getNotifications(): Observable<AppointmentSubject[]> {
    return this.appointmentSubject.asObservable();
  }

  getCurrentNotifications(): AppointmentSubject[] {
    return this.appointmentSubject.getValue();
  }

  clearNotifications(): void {
    this.appointmentSubject.next([]);
  }
}
