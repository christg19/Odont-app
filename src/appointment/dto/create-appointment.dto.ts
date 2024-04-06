import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto {

    @IsString()
    @IsNotEmpty()
    readonly appointmentDate: string
    @IsString()
    @IsOptional()
    readonly notes?:string

    readonly appointmentHour?:string;
    
    readonly servicesName?: string[];
   
    @IsNotEmpty()
    readonly serviceIds: number[];
    @IsNumber()
    @IsNotEmpty()
    readonly patientId:number

}
