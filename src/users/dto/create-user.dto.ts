import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    name: string;
    email: string;
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string;
  }