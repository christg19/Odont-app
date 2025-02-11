import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { AppointmentStatus } from '../appointment.entity';

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

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    toothIds: number[] = [];

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    selectedTeethPositions: number[];

    @IsEnum(AppointmentStatus)
    @IsOptional()
    status?: AppointmentStatus;
}
