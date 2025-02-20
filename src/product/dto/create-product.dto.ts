import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import { IsDate } from "sequelize-typescript";
import { Categories } from "../product.entity";

export class CreateProductDto {
    
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly unitDate: Date;

  @IsString()
  @IsOptional()
  readonly notes?: string;

  @IsOptional()
  readonly expiryDate?: Date;
  
  @IsString()
  readonly categoryProduct: Categories;

  @IsOptional()
  readonly instrumentalState?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly used?: boolean;

  @IsOptional()
  @IsNumber()
  readonly quantity?: number;
}
