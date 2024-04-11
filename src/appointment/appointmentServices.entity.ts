// appointment-service.model.ts
import { Model, ForeignKey, Column, Table } from 'sequelize-typescript';
import { Appointment } from './appointment.entity';
import { Service } from 'src/service/service.entity';

@Table
export class AppointmentService extends Model<AppointmentService> {
  @ForeignKey(() => Appointment)
  @Column
  appointmentId: number;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;

}
