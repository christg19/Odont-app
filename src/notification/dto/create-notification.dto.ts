import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CreateNotificationDto {
    @ApiProperty()
    @IsNotEmpty()
    title:string;
    @ApiProperty()
    @IsNotEmpty()
    description: string;
    @ApiProperty()
    @IsNotEmpty()
    pendingDate:Date;
}