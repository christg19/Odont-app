import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CustomerInvoice } from 'src/customer-invoice/customer-invoice.entity';
import { Patient } from 'src/patient/patient.entity';

@Table
export class Tooth extends Model<Tooth> {
    @Column
    name:string;

    @ForeignKey(() => Patient)
    @Column
    patientId: string;


    @BelongsTo(() => Patient)
    patient: Patient;

}