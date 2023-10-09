import { Column, ForeignKey, Table, BelongsTo, Model } from "sequelize-typescript";
import { Product } from "src/product/product.entity";

@Table
export class CategoryProduct extends Model<CategoryProduct> {

    @Column
    categoryName:string;
    
    @ForeignKey(() => Product)
    @Column
    productId:number;

    @BelongsTo(() => Product)
    product: Product;
  
}
