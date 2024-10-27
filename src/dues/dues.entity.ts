import { Model, ForeignKey, Column, Table, BelongsTo } from 'sequelize-typescript';
import { Appointment } from '../appointment/appointment.entity';
import { Service } from 'src/service/service.entity';
import { Patient } from 'src/patient/patient.entity';

@Table
export class Dues extends Model<Dues> {
  @ForeignKey(() => Patient)
  @Column
  patientId: number;

  @Column
  name:string;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;

  @Column
  dueQuantity:number;

  @Column
  totalCost:number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @Column
  itemType:string = 'due'

}


// crear cuota, y poder agregarle una cuota de un servicio en especifico a un paciente, al crear una cita puedes elegir 
// la cuota y funcionara como un servicio mas, entonces se le resta 1 a duesQuantity y cunado llegue a 0 se borra la cuota del usuario