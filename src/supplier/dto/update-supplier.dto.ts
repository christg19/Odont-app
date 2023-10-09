import { IsString, IsNotEmpty, IsNumber } from "class-validator"

export class UpdatedSupplierDto {
    @IsString()
    @IsNotEmpty()
    readonly companyName?: string
    @IsString()
    @IsNotEmpty()
    readonly name?:string
    @IsString()
    @IsNotEmpty()
    readonly lastName?: string
    @IsString()
    @IsNotEmpty()
    readonly tel?:string
    @IsNumber()
    @IsNotEmpty()
    readonly balance?:number
}