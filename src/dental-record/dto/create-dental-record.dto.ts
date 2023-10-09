import { IsNotEmpty, IsString } from "class-validator"

export class CreateDentalRecordDto {
    @IsNotEmpty()
    @IsString()
    readonly dentalIssue:string 
}

