import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto {

    @IsString()
    @IsNotEmpty()
    readonly appointmentDate: string

    @IsString()
    @IsOptional()
    readonly notes?: string

    readonly appointmentHour?: string;
    
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    readonly serviceIds: number[];

    @IsNumber()
    @IsNotEmpty()
    readonly patientId: number

    @IsNumber()
    @IsOptional()
    readonly totalCost?:number;

    @IsNumber()
    @IsOptional()
    readonly duesCost?:number;
}
