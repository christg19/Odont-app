import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAntecedentAttachmentDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  filePath: string;  // Agrega esta propiedad

  @IsNotEmpty()
  @IsString()
  fileType: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsNumber()
  antecedentId: number;
}



export class UpdateAntecedentAttachmentDto extends PartialType(CreateAntecedentAttachmentDto) {}
