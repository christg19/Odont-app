import { Injectable } from '@nestjs/common';
import { DtoDentalRecord, DtoUpdatedDentalRecord } from './dental-record.dto';
import { DentalRecord } from './dental-record.entity';
import { Client } from 'src/clients/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class DentalRecordService {

    constructor(@InjectRepository(Client) private clientRepository:Repository<Client>,
    @InjectRepository(DentalRecord) private dentalRecordRepository:Repository<DentalRecord>
    ){}

    getAllDentalRecords(){
        return this.dentalRecordRepository.find();
    }
    
    getOneDentalRecord(id:number){
        return this.dentalRecordRepository.findOne({
            where:{
                id: id
            }
        })
    }

    async registerDentalRecord( userId:number, details:string){
        const cliente = await this.clientRepository.findOne({
            where:{
                id: userId
            }
        })
        if(!cliente) throw new error ('Client not found')

        const dentalRecord = new DentalRecord();
        dentalRecord.procedimientosRealizados = details || "";
        dentalRecord.paciente = cliente;
        // Agregar que solo se puedae crear un dentalRecord por paciente

        return this.dentalRecordRepository.save(dentalRecord);
    }

    updateDentalRecord(updatedDentalRecord:DtoUpdatedDentalRecord, id:number){
        return this.dentalRecordRepository.update({id}, updatedDentalRecord);
    }

    deleteDentalRecord(id:number){
        return this.dentalRecordRepository.delete(id);
    }
}
