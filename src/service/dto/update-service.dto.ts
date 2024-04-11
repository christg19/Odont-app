import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateServiceDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsNumber()
    cost: number;

    @IsOptional()
    @IsNumber()
    duesQuantity:number;

    @IsOptional()
    productIds:string[];
}