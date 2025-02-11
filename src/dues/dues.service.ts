import { Injectable } from '@nestjs/common';
import { CreateDueDto, UpdateDueDto } from './dto/index';
import { InjectModel } from '@nestjs/sequelize';
import Sequelize from 'sequelize';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import sequelize from 'sequelize';
import { Transaction } from 'sequelize';
import { Dues } from './dues.entity';
import { error } from 'console';
import { Patient } from 'src/patient/patient.entity';

@Injectable()
export class DuesService {

    constructor(@InjectModel(Dues) private dueModel: typeof Dues,
    @InjectModel(Patient) private patientModel: typeof Patient,
      ) { }

    async getAll(): Promise<Dues[]> {
       const dues: Dues[] = await this.dueModel.findAll();
       
      const filteredDues = dues.filter((due) => {
       return due.totalCost > 0
       })

     return filteredDues;
    }

    async getDueById(id: number): Promise<Dues> {
        const due = this.dueModel.findOne({ where: { id }});

        if (!id || isNaN(id)) {
            throw new BadRequestException('Id no válido');
          }

          return due;
    }

    async createDue(dto: CreateDueDto) {
        return this.dueModel.create(dto);
    }


    async updateDue(dto: UpdateDueDto, id: number) {
        const due = await this.dueModel.findByPk(id);

        if (dto.patientId) {
            const patient = await this.patientModel.findOne({
                where: { id: dto.patientId },
            });

            if (!patient) {
                throw new NotFoundException('Paciente no encontrado');
            }
        }

        await due.update(dto)


    }

    async patchDue(id: number, dto: Partial<UpdateDueDto>) {
        const due = await this.dueModel.findByPk(id);
        if (!due) {
            throw new NotFoundException('Due not found');
        }
    
        await due.update(dto);
    }


    async deleteDue(id: number) {

        const due = await this.dueModel.findByPk(id);

        await due.destroy();
    }

}
