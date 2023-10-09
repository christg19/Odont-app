import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAppointmentDto {
    @IsString()
    @IsOptional()
    readonly appointmentDate?: Date
    @IsString()
    @IsOptional()
    readonly notes?:string
    @IsNumber({}, {each:true})
    @IsOptional()
    readonly serviceIds?: number[];
    @IsNumber()
    @IsOptional()
    readonly patientId?:number
}