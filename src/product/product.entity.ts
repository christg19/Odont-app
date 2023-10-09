import { Column, Table, Model, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CategoryProduct } from "src/category-product/category-product.entity";
import { Supplier } from "src/supplier/supplier.entity";

@Table({ tableName: 'Product' })
export class Product extends Model<Product> {
    @ForeignKey(() => Supplier)
    @Column
    proveedorId:number;

    @BelongsTo(() => Supplier)
    supplier:Supplier;

    @Column
    name:string;

    @Column
    costToBuy:number;

    @Column
    priceToSell:number;

    @Column
    units:number;

    @HasOne(() => CategoryProduct)
    categoryProduct: CategoryProduct;
}