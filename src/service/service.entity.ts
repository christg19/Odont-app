import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Appointment } from 'src/appointment/appointment.entity';

@Table
export class Service extends Model<Service> {
    @Column
    name:string

    @Column
    cost:number

    @ForeignKey(() => Appointment)
    @Column
    appointmentId: number;

    @BelongsTo(() => Appointment)
    appointment: Appointment;

}