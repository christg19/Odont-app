import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AntecedentsService } from './antecedents.service';
import { Antecedent } from './antecedents.entity';
import { CreateAntecedentDto } from './dto/antecedents-create.dto';
import { UpdateAntecedentDto } from './dto/antecedents-update.dto';

@Controller('antecedents')
@ApiTags('antecedents')
export class AntecedentsController {
  constructor(private readonly antecedentsService: AntecedentsService) {}

  @Get()
  async getAll(): Promise<Antecedent[]> {
    return this.antecedentsService.getAllAntecedents();
  }

  @Get('patient/:patientId')
  async getByPatient(@Param('patientId') patientId: number): Promise<Antecedent[]> {
    return this.antecedentsService.getAntecedentsByPatientId(patientId);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Antecedent> {
    return this.antecedentsService.getAntecedentById(id);
  }

  @Post()
  async create(@Body() dto: CreateAntecedentDto): Promise<Antecedent> {
    return this.antecedentsService.createAntecedent(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAntecedentDto): Promise<Antecedent> {
    return this.antecedentsService.updateAntecedent(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.antecedentsService.deleteAntecedent(id);
  }
}
