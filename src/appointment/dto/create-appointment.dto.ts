import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Service } from 'src/service/service.entity'

export class CreateAppointmentDto {

    appointmentDate: Date
    @IsString()
    @IsOptional()
    notes:string
    serviceIds: number[];
    patientId:number
}
