import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { Patient } from './patient.entity';

@Injectable()
export class ClientsService {

    constructor(
        @InjectModel(Patient)
        private patientModel: typeof Patient
    ) { }

    async getAllPatients(page: number, limit: number): Promise<{ items: Patient[]; total: number }> {
        const offset = (page - 1) * limit;
        const patients = await this.patientModel.findAndCountAll({
            limit: limit,
            offset: offset,
        });

        return {
            items: patients.rows,
            total: patients.count,
        };
    }

    async getOnePatient(id: number): Promise<Patient> {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        }

        const patient = await this.patientModel.findOne({
            where: {
                id: id
            }
        });

        if (!patient) {
            throw new NotFoundException('Paciente no encontrado');
        };

        return patient;

    }

    async createPatient(newPatient: CreatePatientDto): Promise<void> {
        try {
            this.patientModel.create(newPatient);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePatient(newPatient: UpdatePatientDto, id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        }

        const patient = await this.patientModel.findOne({
            where: {
                id: id
            }
        });

        if (!patient) {
            throw new NotFoundException('Paciente no encontrado');
        }

        await patient.update(newPatient);
        return 'Paciente registrado';

    }

    async deletePatient(id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        }

        const patient = await this.patientModel.findOne({
            where: {
                id: id
            }
        });

        if (!patient) {
            throw new NotFoundException('Paciente no encontrado');
        }

        await patient.destroy();
        return 'El paciente fue eliminado correctamente';

    }

}
