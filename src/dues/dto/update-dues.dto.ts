import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateDueDto {
    @IsNumber()
    @IsOptional()
    patientId:number;

    @IsNumber()
    @IsOptional()
    serviceId:number;
    
    @IsString()
    @IsOptional()
    name:string;

    @IsNumber()
    @IsOptional()
    dueQuantity:number;
    
    @IsNumber()
    @IsOptional()
    totalCost:number;
}