import { IsOptional, IsString } from "class-validator"

export class UpdateDentalRecordDto {
    @IsOptional()
    @IsString()
    readonly dentalIssue?:string
}