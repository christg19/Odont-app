import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class DtoClient {

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

export class DtoUpdatedClient {

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