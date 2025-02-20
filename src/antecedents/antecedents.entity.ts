import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';
import { AntecedentAttachment } from '../antecedents-attachment/antecedentAttachment.entity';

@Table({ tableName: 'Antecedents' })
export class Antecedent extends Model<Antecedent> {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Patient)
  @Column({
    allowNull: false,
  })
  patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @HasMany(() => AntecedentAttachment)
  attachments: AntecedentAttachment[];
}
