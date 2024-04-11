import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany, DataType } from 'sequelize-typescript';
import { Appointment } from 'src/appointment/appointment.entity';
import { AppointmentService } from 'src/appointment/appointmentServices.entity';
import { CustomerInvoice } from 'src/customer-invoice/customer-invoice.entity';
import { Product } from 'src/product/product.entity';

@Table
export class Service extends Model<Service> {
    @Column
    name: string;

    @Column
    cost: number;

    @Column
    duesQuantity: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.ARRAY(DataType.STRING) })
    productIds: string[];

    @BelongsToMany(() => Appointment, () => AppointmentService)
    appointments: Appointment[];

    @ForeignKey(() => CustomerInvoice)
    @Column
    customerInvoiceId: number;

}