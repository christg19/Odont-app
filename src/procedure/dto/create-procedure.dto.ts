import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ProcedureStatus } from "../procedure.entity";

export class CreateProcedureDto {
    @IsNumber()
    @IsNotEmpty()
    toothId:number;

    @IsEnum(ProcedureStatus)
    @IsNotEmpty()
    status:ProcedureStatus;
}