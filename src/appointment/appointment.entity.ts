import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, DataType, BelongsToMany } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';
import { Service } from 'src/service/service.entity';
import { AppointmentService } from './appointmentServices.entity';

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

  @Column
  totalCost: number;

  @BelongsToMany(() => Service, () => AppointmentService)
  service: Service[];


  @BelongsTo(() => Patient)
  patient: Patient;
}

