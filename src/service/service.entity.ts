import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany, DataType } from 'sequelize-typescript';
import { Appointment } from 'src/appointment/appointment.entity';
import { AppointmentService } from 'src/appointment/appointmentServices.entity';
import { CustomerInvoice } from 'src/customer-invoice/customer-invoice.entity';
import { Product } from 'src/product/product.entity';

export enum Categories {
    QUIMICO = "Quimico",
    DESECHABLE = "Desechable",
    INSTRUMENTO = "Instrumento"
}

export interface ProductUsage {
  productId: number;
  quantity: number;
}

@Table
export class Service extends Model<Service> {
    @Column
    name: string;

    @Column
    cost: number;

    @Column
    duesQuantity: number;

    // Cambiamos de productIds a productUsages (almacenado en formato JSON)
    @Column({
      type: DataType.JSON
    })
    productUsages: ProductUsage[];

    @BelongsToMany(() => Appointment, () => AppointmentService)
    appointments: Appointment[];

    @ForeignKey(() => CustomerInvoice)
    @Column
    customerInvoiceId: number;

    @Column
    itemType: string = 'service';
}
