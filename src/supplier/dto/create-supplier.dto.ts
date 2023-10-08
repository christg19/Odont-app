import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty()
    readonly companyName: string
    @IsString()
    @IsNotEmpty()
    readonly name:string
    @IsString()
    @IsNotEmpty()
    readonly lastName: string
    @IsString()
    @IsNotEmpty()
    readonly tel:string
    @IsNumber()
    @IsNotEmpty()
    readonly balance:number
}