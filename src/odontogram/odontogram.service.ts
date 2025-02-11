import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Odontogram } from './odontogram.entity';
import { CreateOdontogramDto, UpdateOdontogramDto } from './dto';
import { Tooth } from 'src/tooth/tooth.entity';
import { Patient } from 'src/patient/patient.entity';

@Injectable()
export class OdontogramService {
    constructor(@InjectModel(Odontogram) private odontogramModel: typeof Odontogram,
        @InjectModel(Patient) private patientModel: typeof Patient,
        @InjectModel(Tooth) private toothModel: typeof Tooth) { }

    async getOdontograms(): Promise<Odontogram[]> {
        return await this.odontogramModel.findAll();
    }

    async getOdontogram(id: number): Promise<Odontogram> {
        try {
            if (id < 1) {
                throw new Error('El ID no es válido');
            }

            return await this.odontogramModel.findOne({
                where: { id: id },
                include: [{ model: Tooth }],  
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async createOdontogram(dto: CreateOdontogramDto): Promise<Odontogram> {
        try {
            const patient = await this.patientModel.findOne({
                where: {
                    id: dto.patientId
                }
            });

            if (!patient) {
                throw new NotFoundException('Paciente no encontrado');
            }

            const toothList: Tooth[] = dto.tooth.map((toothData) => {
                return { ...toothData, odontogramId: null } as Tooth;
            })

            const newOdontogram: CreateOdontogramDto = {
                patientId: dto.patientId,
                tooth: []
            }

            const odontogram = await this.odontogramModel.create(newOdontogram);

            toothList.forEach((tooth: Tooth) => {
                tooth.odontogramId = odontogram.id;
            })

            this.toothModel.bulkCreate(toothList);

            return this.odontogramModel.findOne({
                where: {
                    id: odontogram.id
                },
                include: [Tooth]
            });

        } catch (error) {
            throw new Error(error);
        }
    }

    async updateOdontogram(id: number, dto: UpdateOdontogramDto): Promise<Odontogram> {
        try {
            const odontogram = await this.odontogramModel.findOne({
                where: { id },
                include: [Tooth],
            });
    
            if (!odontogram) {
                throw new NotFoundException('Odontograma no encontrado');
            }
    
            if (dto.tooth && dto.tooth.length > 0) {
                for (const toothData of dto.tooth) {
                    const existingTooth = odontogram.tooth.find((t) => t.toothPosition === toothData.toothPosition);
                    
                    if (existingTooth) {
                        await this.toothModel.update(toothData, {
                            where: { id: existingTooth.id }
                        });
                    } else {
                        await this.toothModel.create({
                            ...toothData,
                            odontogramId: odontogram.id
                        });
                    }
                }
            }
    
            return await this.odontogramModel.findOne({
                where: { id: odontogram.id },
                include: [Tooth],
            });
    
        } catch (error) {
            throw new Error(`Error al actualizar el odontograma: ${error.message}`);
        }
    }
    

    deleteOdontogram(id: number) {
        try {
            if(id < 1){
                throw new Error('El ID no es válido');
            }

            const odontogram = this.odontogramModel.findOne({
                where: {
                    id: id
                }
            });
            
        } catch (error) {

        }
    }


}
