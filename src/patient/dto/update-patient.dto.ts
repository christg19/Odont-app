import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'


export class UpdatePatientDto {

    @IsString()
    @IsOptional()
    readonly name?:string
    @IsNumber()
    @IsOptional()
    readonly age?:number
    @IsString()
    @IsOptional()
    readonly address?:string
    @IsString()
    @IsOptional()
    readonly tel?:string
    @IsString()
    @IsOptional()
    readonly email?:string
}