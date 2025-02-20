import { IsOptional, IsString, IsBoolean, IsNumber } from "class-validator";
import { Categories } from "../product.entity";

export class UpdatedProductDto {
  
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly unitDate?: Date;

  @IsString()
  @IsOptional()
  readonly notes?: string;

  @IsOptional()
  readonly expiryDate?: Date;

  @IsString()
  @IsOptional()
  readonly categoryProduct?: Categories;

  @IsOptional()
  @IsBoolean()
  readonly instrumentalState?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly used?: boolean;

  @IsOptional()
  @IsNumber()
  readonly quantity?: number;
}
