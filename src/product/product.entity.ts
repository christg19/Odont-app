import { Column, Table, Model, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CategoryProduct } from "src/category-product/category-product.entity";
import { Supplier } from "src/supplier/supplier.entity";

export enum Categories {
    QUIMICO = "Quimico",
    DESECHABLE = "Desechable",
    INSTRUMENTO = "Instrumento"
}

@Table({ tableName: 'Product' })
export class Product extends Model<Product> {

    @Column
    name: string;

    @Column
    unitDate: Date;

    @Column
    notes?: string;

    @Column
    expiryDate?: Date;
    
    @Column
    instrumentalState?:boolean;

    @Column
    used:boolean;

    @Column
    quantity:number;

    @Column
    categoryProduct: Categories;

}