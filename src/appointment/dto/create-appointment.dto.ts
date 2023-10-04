import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto {
    @IsDate()
    appointmentDate: Date
    @IsString()
    @IsOptional()
    notes:string
}
