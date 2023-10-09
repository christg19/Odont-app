import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePatientDto {

    @IsString()
    @IsNotEmpty()
    readonly name:string
    @IsNumber()
    @IsNotEmpty()
    readonly age:number
    @IsString()
    @IsOptional()
    readonly address:string
    @IsString()
    @IsOptional()
    readonly tel:string
    @IsString()
    @IsOptional()
    readonly email?:string

}