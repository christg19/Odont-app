import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ToothStatus } from "../tooth.entity";
import { Type } from "class-transformer";
import { CreateProcedureDto } from "src/procedure/dto/create-procedure.dto";
import { Procedure } from "src/procedure/procedure.entity";

export class CreateToothDto {
    @IsNumber()
    @IsNotEmpty()
    toothPosition:number;

    @IsEnum(ToothStatus)
    @IsOptional()
    status:number

    @IsNumber()
    @IsNotEmpty()
    odontogramId:number;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    serviceIds: number[] = [];

    @IsString()
    @IsOptional()
    toothName:string;
  

}

export class UpdateToothStatusDto {
    @IsNumber()
    @IsNotEmpty()
    odontogramId: number;
  
    @IsNumber()
    @IsNotEmpty()
    status: number;
  }

  export class UpdateServiceIdsDto {
    @IsNumber()
    @IsNotEmpty()
    odontogramId: number;
  
    @IsArray()
    @IsNumber({}, { each: true })
    serviceIds: number[];
  }