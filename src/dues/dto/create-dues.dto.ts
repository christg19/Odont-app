import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateDueDto {
    @IsNumber()
    @IsNotEmpty()
    patientId:number;

    @IsNumber()
    @IsNotEmpty()
    serviceId:number;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    dueQuantity:number;

    @IsNumber()
    @IsNotEmpty()
    totalCost:number;

}
