import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { Patient } from './patient.entity';

@Injectable()
export class ClientsService {

    constructor(
        @InjectModel(Patient)
        private patientModel: typeof Patient
      ) {}

    async getAllPatients(): Promise<Patient[]>{
        return this.patientModel.findAll();
    }

    async getOnePatient(id:number): Promise<Patient>{
        return this.patientModel.findOne({
            where: {
                id: id
            }
        });
    }

    async createPatient(newPatient: CreatePatientDto): Promise <void>{
        this.patientModel.create(newPatient);
    }

    async updatePatient(newPatient: UpdatePatientDto, id:number){
       const patient = await this.patientModel.findOne({
        where:{
            id:id
        }
       });

       await patient.update(newPatient);
    }

    async deletePatient(id: number): Promise <void>{
        const patient = await this.patientModel.findOne({
            where:{
                id:id
            }
        })

        await patient.destroy()

    }
    
}
