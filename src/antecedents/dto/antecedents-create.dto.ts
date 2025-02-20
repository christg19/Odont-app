import { IsNotEmpty, IsDateString, IsString, IsNumber } from 'class-validator';

export class CreateAntecedentDto {
  @IsNotEmpty()
  @IsDateString()
  date: string; 

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;
}
