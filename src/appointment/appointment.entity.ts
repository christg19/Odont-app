import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, DataType, BelongsToMany } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';
import { Service } from 'src/service/service.entity';
import { AppointmentService } from './appointmentServices.entity';
import { Tooth } from 'src/tooth/tooth.entity';
import { AppointmentTooth } from './appointment-tooth.entity';

export enum AppointmentStatus {
  Pendiente = 0,
  Completada = 1,
  Cancelada = 2,
}

@Table
export class Appointment extends Model<Appointment> {
  @Column
  appointmentDate: string;

  @Column
  patientName: string;

  @ForeignKey(() => Patient)
  @Column
  patientId: number;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  serviceIds: number[];

  @Column
  notes: string;

  @Column({
    type: DataType.INTEGER, 
    allowNull: false,
    defaultValue: AppointmentStatus.Pendiente,
  })
  status: AppointmentStatus;

  @Column
  totalCost: number;

  @BelongsToMany(() => Service, () => AppointmentService)
  service: Service[];


  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsToMany(() => Tooth, () => AppointmentTooth)
  teeth: Tooth[];
}

