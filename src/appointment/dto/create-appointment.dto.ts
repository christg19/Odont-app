import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto {

    @IsString()
    @IsNotEmpty()
    readonly appointmentDate: Date
    @IsString()
    @IsNotEmpty()
    readonly notes:string
    @IsNumber()
    @IsNotEmpty()
    readonly serviceIds: number[];
    @IsNumber()
    @IsNotEmpty()
    readonly patientId:number
}
