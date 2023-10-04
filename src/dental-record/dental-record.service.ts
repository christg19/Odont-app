import { Injectable } from '@nestjs/common';
import { CreateDentalRecordDto, UpdateDentalRecordDto } from './dto';
import { DentalRecord } from './dental-record.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DentalRecordService {

    constructor(@InjectModel(DentalRecord) private dentalRecordModel: typeof DentalRecord ){}

    async getAllDentalRecords(): Promise<DentalRecord[]>{
        return this.dentalRecordModel.findAll();
    }

    async getOneDentalRecord(id:number): Promise<DentalRecord>{
        return this.dentalRecordModel.findOne({
            where: {
                id: id
            }
        });
    }

    async createDentalRecord(dto: CreateDentalRecordDto): Promise <void>{
        this.dentalRecordModel.create(dto);
    }

    async updateDentalRecord(dto: UpdateDentalRecordDto, id:number){
       const dentalRecord = await this.dentalRecordModel.findOne({
        where:{
            id:id
        }
       });
       await dentalRecord.update(dto);
    }

    async deleteDentalRecord(id: number): Promise <void>{
        const dentalRecord = await this.dentalRecordModel.findOne({
            where:{
                id:id
            }
        })

        await dentalRecord.destroy()

    }
}
