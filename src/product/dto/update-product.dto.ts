import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsDate } from "sequelize-typescript";

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
    
}