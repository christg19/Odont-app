import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, DataType } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';
import { Service } from 'src/service/service.entity';

@Table
export class Appointment extends Model<Appointment> {
  @Column
  appointmentDate: Date;

  @Column
  patientName: string;

  @ForeignKey(() => Patient) 
  @Column
  patientId: number;

  @Column
  notes:string;

  @Column
  totalCost:number;

  @Column(DataType.ARRAY(DataType.STRING))
  servicesName: string[];

  @HasMany(() => Service)
  service: Service[];

  @BelongsTo(() => Patient)
  patient: Patient;
}

