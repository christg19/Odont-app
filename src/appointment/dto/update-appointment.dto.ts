import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { AppointmentStatus } from '../appointment.entity';

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

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    toothIds?: number[] = [];

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    selectedTeethPositions: number[];

    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;
}