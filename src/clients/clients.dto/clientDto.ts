import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'
import { AppointmentsStatus } from '../client.entity'

export class DtoClient {
    @IsString()
    @IsNotEmpty()
    name:string
    @IsNotEmpty()
    @MinLength(11)
    id_cedula:string
    @IsNotEmpty()
    @IsNumber()
    age:number
    @IsNotEmpty()
    @IsString()
    tel:string
}

export class DtoUpdatedClient {
    @IsString()
    @IsOptional()
    name:string
    @IsString()
    @IsOptional()
    id_cedula:string
    @IsNumber()
    @IsOptional()
    age:number
    @IsString()
    @IsOptional()
    tel:string
    @IsIn([AppointmentsStatus.NONE, AppointmentsStatus.SOMETHING])
    @IsOptional()
    appointment: AppointmentsStatus
}