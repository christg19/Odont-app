import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto {

    @IsString()
    @IsNotEmpty()
    readonly appointmentDate: Date
    @IsString()
    @IsOptional()
    readonly notes?:string

    @IsString()
    appointmentHour:string;
   
    @IsNotEmpty()
    readonly serviceIds: number[];
    @IsNumber()
    @IsNotEmpty()
    readonly patientId:number

}
