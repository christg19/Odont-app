import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { Patient } from './patient.entity';
import { Dues } from 'src/dues/dues.entity';
import { Odontogram } from 'src/odontogram/odontogram.entity';
import { Appointment } from 'src/appointment/appointment.entity';

@Injectable()
export class ClientsService {

    constructor(
        @InjectModel(Patient)
        private patientModel: typeof Patient,
        @InjectModel(Odontogram) private odontogramModel: typeof Odontogram
    ) { }

    async getAllPatients(): Promise<Patient[]> {
        const patientWithDues = await Patient.findAll({
            include: [{
              model: Dues,
              as: 'dues' 
            }]
          });

          return patientWithDues;
    }

    async getOnePatient(id: number): Promise<Patient> {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        }

        if(Number.isNaN(id)){
            throw new Error('El ID no es la valido');
        }

        const patientWithDues = await Patient.findOne({
            where:{
                id:id
            },
            include: [{
              model: Dues,
              as: 'dues' 
            },
        {model:Appointment}]
          });

        if (!patientWithDues) {
            throw new NotFoundException('Paciente no encontrado');
        };

        return patientWithDues;

    }

    async createPatient(newPatient: CreatePatientDto): Promise<void> {
        try {
            const createdPatient = await this.patientModel.create(newPatient);

            await this.odontogramModel.create({ patientId: createdPatient.id, tooth: [] });
    
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

        return { "message": "El paciente fue eliminado correctamente" }

    }

 
}
