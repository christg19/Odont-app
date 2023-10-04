import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';

@Table
export class DentalRecord extends Model<DentalRecord> {
  @Column
  dentalIssue: string;

  @ForeignKey(() => Patient) 
  @Column
  patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;
}

