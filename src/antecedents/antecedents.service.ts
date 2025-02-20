import { InjectModel } from '@nestjs/sequelize';
import { Antecedent } from './antecedents.entity';
import { CreateAntecedentDto } from './dto/antecedents-create.dto';
import { UpdateAntecedentDto } from './dto/antecedents-update.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile } from 'fs/promises';

@Injectable()
export class AntecedentsService {
  constructor(
    @InjectModel(Antecedent) private antecedentModel: typeof Antecedent
  ) {}

  async getAllAntecedents(): Promise<Antecedent[]> {
    return this.antecedentModel.findAll();
  }

  async getAntecedentsByPatientId(patientId: number): Promise<Antecedent[]> {
    return this.antecedentModel.findAll({ where: { patientId } });
  }

  async getAntecedentById(id: number): Promise<Antecedent> {
    const antecedent = await this.antecedentModel.findOne({ where: { id } });
    if (!antecedent) {
      throw new NotFoundException('Antecedente no encontrado');
    }
    return antecedent;
  }

  async createAntecedent(dto: CreateAntecedentDto): Promise<Antecedent> {
  
    const antecedentData = {
      ...dto,
      date: new Date(dto.date)
    };
    return this.antecedentModel.create(antecedentData);
  }
  

  async updateAntecedent(id: number, dto: UpdateAntecedentDto): Promise<Antecedent> {
    const antecedent = await this.getAntecedentById(id);
    const antecedentData = {
        ...antecedent,
        date: new Date(dto.date)
    };
    await antecedent.update(antecedentData);
    return antecedent;
  }

  async deleteAntecedent(id: number): Promise<{ message: string }> {
    const antecedent = await this.getAntecedentById(id);
    await antecedent.destroy();
    return { message: 'Antecedente eliminado correctamente' };
  }

  async saveAttachment(file: Express.Multer.File): Promise<{ base64: string; filePath: string }> {
    try {
      const fileData = await readFile(file.path);
      const base64 = fileData.toString('base64');
      return { base64, filePath: file.path };
    } catch (error) {
      throw new NotFoundException("No se pudo leer el archivo");
    }
  }
}
