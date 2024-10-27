import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAppointmentDto {
    @IsString()
    @IsOptional()
    readonly appointmentDate?: string

    @IsString()
    @IsOptional()
    readonly notes?: string

    @IsNumber({}, { each: true })
    @IsOptional()
    readonly serviceIds?: number[];

    @IsNumber()
    @IsOptional()
    readonly patientId?: number


    @IsOptional()
    readonly appointmentHour?: string;

    @IsNumber()
    @IsOptional()
    totalCost?: number;

    @IsString()
    @IsOptional()
    patientName?: string;

    @IsNumber()
    @IsOptional()
    readonly duesCost?:number;
}