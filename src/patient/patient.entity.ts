import { Table, Column, Model, HasOne, HasMany } from 'sequelize-typescript';
import { DentalRecord } from 'src/dental-record/dental-record.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Dues } from 'src/dues/dues.entity';

@Table
export class Patient extends Model<Patient> {
  @Column
  name: string;

  @Column
  age:number

  @Column
  address:string
  
  @Column
  tel:string

  @Column
  email: string

  @HasOne(() => DentalRecord)
  dentalRecord: DentalRecord;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => Dues)
  dues: Dues[];
}


