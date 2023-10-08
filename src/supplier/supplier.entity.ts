import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { Product } from "src/product/product.entity";


@Table
export class Supplier extends Model<Supplier> {
    @Column
    companyName:string

    @Column
    name:string

    @Column
    lastName:string

    @Column
    tel:string

    @Column
    balance:number

    @HasMany(() => Product)
    product: Product[];
}