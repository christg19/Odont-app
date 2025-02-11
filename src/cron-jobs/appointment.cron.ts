import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentStatus } from 'src/appointment/appointment.entity';
import { AppointmentsService } from 'src/appointment/appointment.service';
import { NotificationsService } from 'src/notification/notifications.service';

@Injectable()
export class AppointmentCronService {
  private readonly logger = new Logger(AppointmentCronService.name);

  constructor(
    private readonly appointmentService: AppointmentsService,
    private readonly notificationsService: NotificationsService,

  ) {}

  @Cron('*/10 * * * * *') 
  async checkAndCompleteAppointments() {
    this.logger.log('Checking appointments to update their status...');
    try {
      const appointmentsToComplete = await this.appointmentService.findPendingPastAppointments();
      this.logger.log(`Appointments to complete: ${JSON.stringify(appointmentsToComplete)}`);
  
      if (appointmentsToComplete.length === 0) {
        this.logger.log('No appointments to complete.');
        return;
      }
  
      const appointmentIds = appointmentsToComplete.map(a => a.id);
      this.logger.log(`Updating appointments to completed: IDs: ${appointmentIds}`);
  
      await this.appointmentService.updateBulkStatus(appointmentIds, AppointmentStatus.Completada);
  
      appointmentsToComplete.forEach(appointment => {
        this.notifyFrontend(appointment, 'completed');
      });
    } catch (error) {
      this.logger.error('Error updating appointments:', error.message, error.stack);
    }
  }

  @Cron('*/10 * * * * *') 
  async notifyUpcomingAppointments() {
    this.logger.log('Checking for upcoming appointments in the next two days...');
    try {
      const appointments = await this.appointmentService.getAppointments();
      const today = new Date();

      const upcomingAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.appointmentDate); 
        const timeDiff = appointmentDate.getTime() - today.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24); 
        return daysDiff >= 0 && daysDiff <= 1; 
      });

      this.logger.log(`Upcoming appointments to notify: ${JSON.stringify(upcomingAppointments)}`);

      upcomingAppointments.forEach(appointment => {
        this.notifyFrontend(appointment, 'upcoming'); 
      });
    } catch (error) {
      this.logger.error('Error notifying upcoming appointments:', error.message, error.stack);
    }
  }

  private notifyFrontend(appointment: any, type: 'upcoming' | 'completed') {
    if (!appointment?.patientName || !appointment?.appointmentDate) {
      this.logger.warn(`Skipping notification for appointment with missing data: ${JSON.stringify(appointment)}`);
      return;
    }

    this.logger.log(`Notifying frontend about appointment: ${JSON.stringify(appointment)}`);

    this.notificationsService.addNotification({
      patientName: appointment.patientName,
      date: appointment.appointmentDate,
      seen: false,
      type,
    });
  }
}
