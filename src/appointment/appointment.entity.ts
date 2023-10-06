import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';
import { Service } from 'src/service/service.entity';

@Table
export class Appointment extends Model<Appointment> {
  @Column
  appointmentDate: Date;

  @ForeignKey(() => Patient) 
  @Column
  patientId: number;

  @Column
  notes:string

  @HasMany(() => Service)
  services: Service[];

  @BelongsTo(() => Patient)
  patient: Patient;
}

