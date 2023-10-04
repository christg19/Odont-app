import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'


export class UpdatePatientDto {

    @IsString()
    @IsOptional()
    name:string
    @IsNumber()
    @IsOptional()
    age:number
    @IsString()
    @IsOptional()
    address:string
    @IsString()
    @IsOptional()
    tel:string
    @IsString()
    @IsOptional()
    email?:string
}