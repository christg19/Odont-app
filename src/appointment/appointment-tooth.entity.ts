import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Appointment } from './appointment.entity';
import { Tooth } from 'src/tooth/tooth.entity';

@Table
export class AppointmentTooth extends Model<AppointmentTooth> {
  @ForeignKey(() => Appointment)
  @Column
  appointmentId: number;

  @ForeignKey(() => Tooth)
  @Column
  toothId: number;

}
