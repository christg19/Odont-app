import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';

@Table
export class Appointment extends Model<Appointment> {
  @Column
  appointmentDate: Date;

  @ForeignKey(() => Patient) 
  @Column
  patientId: number;

  @Column
  notes:string

  @BelongsTo(() => Patient)
  patient: Patient;
}

