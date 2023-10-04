import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePatientDto {

    @IsString()
    @IsNotEmpty()
    name:string
    @IsNumber()
    @IsNotEmpty()
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