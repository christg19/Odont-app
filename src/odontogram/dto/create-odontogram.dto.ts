import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Tooth } from 'src/tooth/tooth.entity';


export class CreateOdontogramDto {

    @IsOptional()
    tooth?:Tooth[];

    @IsNotEmpty()
    @IsNumber()
    patientId: number;


}