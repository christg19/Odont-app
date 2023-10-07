import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, NotNull, DataType } from 'sequelize-typescript';
import { Patient } from 'src/patient/patient.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Service } from 'src/service/service.entity';

@Table
export class CustomerInvoice extends Model<CustomerInvoice> {
    @ForeignKey(() => Patient)
    @Column
    patientId: number;

    @BelongsTo(() => Patient)
    patient: Patient;

    @Column
    patientName: string;

    @Column
    dateAppointment: Date;

    @Column
    cost: number;

    @ForeignKey(() => Appointment)
    @Column
    appointmentId: number;
    
    @BelongsTo(() => Appointment)
    appointment: Appointment;

    @Column(DataType.ARRAY(DataType.JSONB))
    service: Service[];

}