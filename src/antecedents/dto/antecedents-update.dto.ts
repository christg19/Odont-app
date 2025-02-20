import { PartialType } from '@nestjs/swagger';
import { CreateAntecedentDto } from './antecedents-create.dto';

export class UpdateAntecedentDto extends PartialType(CreateAntecedentDto) {}
