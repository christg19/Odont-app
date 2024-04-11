import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsDate } from "sequelize-typescript";
import { Categories } from "../product.entity";

export class UpdatedProductDto {
    
    @IsString()
    @IsOptional()
    readonly name?:string;

    @IsOptional()
    readonly unitDate?: Date;

    @IsString()
    @IsOptional()
    readonly notes?: string;

    @IsOptional()
    readonly expiryDate?:Date;

    @IsString()
    @IsOptional()
    readonly categoryProduct?:Categories;
    
}