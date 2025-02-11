import { PartialType } from "@nestjs/swagger";
import { CreateToothDto } from "./create-tooth.dto";

export class UpdateToothDto extends PartialType (CreateToothDto) { }