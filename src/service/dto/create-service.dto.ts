import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { Categories } from "../service.entity";

class ProductUsageDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    cost: number;

    @IsNotEmpty()
    @IsNumber()
    duesQuantity: number;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductUsageDto)
    productUsages: ProductUsageDto[];
}
