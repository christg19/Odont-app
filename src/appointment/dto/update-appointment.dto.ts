import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAppointmentDto {
    @IsDate()
    @IsOptional()
    appointmentDate?: Date
    @IsString()
    @IsOptional()
    notes?:string
}