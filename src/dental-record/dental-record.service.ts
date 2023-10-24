import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDentalRecordDto, UpdateDentalRecordDto } from './dto';
import { DentalRecord } from './dental-record.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DentalRecordService {

    constructor(@InjectModel(DentalRecord) private dentalRecordModel: typeof DentalRecord) { }

    async getAllDentalRecords(page: number, limit: number): Promise<{ items: DentalRecord[], total: number }> {
        const offset = (page - 1) * limit;
        const dentalRecord = await this.dentalRecordModel.findAndCountAll({
            limit: limit,
            offset: offset
        });

        return {
            items: dentalRecord.rows,
            total: dentalRecord.count,
        };
    }

    async getOneDentalRecord(id: number): Promise<DentalRecord> {
        if (id !== null && id !== undefined) {
            return this.dentalRecordModel.findOne({
                where: {
                    id: id
                }
            });
        } else {
            throw new NotFoundException('Registro dental no encontrado')
        }
    }

    async createDentalRecord(dto: CreateDentalRecordDto): Promise<void> {
        try {
            await this.dentalRecordModel.create(dto);
        } catch (error) {
            throw new Error('No se pudo crear el registro dental')
        }

    }

    async updateDentalRecord(dto: UpdateDentalRecordDto, id: number) {
        if (id !== null && id !== undefined) {
            const dentalRecord = await this.dentalRecordModel.findOne({
                where: {
                    id: id
                }
            });
            await dentalRecord.update(dto);
            return 'El Registro dental fue actualizado correctamente';
        } else {
            throw new NotFoundException('Registro dental no encontrado')
        }
    }

    async deleteDentalRecord(id: number) {
        if (id !== null && id !== undefined) {
            const dentalRecord = await this.dentalRecordModel.findOne({
                where: {
                    id: id
                }
            });

            await dentalRecord.destroy();
            return 'El Registro dental fue eliminado correctamente';
        } else {
            throw new NotFoundException('Registro dental no encontrado')
        }

    }
}
