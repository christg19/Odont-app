import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { DtoDentalRecord, DtoUpdatedDentalRecord } from './dental-record.dto';
import { DentalRecord } from './dental-record.entity';

@Injectable()
export class DentalRecordService {

    private dentalRecordInMemory:DtoDentalRecord = [{
        id:v4()
    }]

    getAllDentalRecords(){

    }
    
    getOneDentalRecord(id:string){

    }

    registerDentalRecord(newDentalRecord:DtoDentalRecord, userId:string){
        const dentalRecord:DentalRecord = {
            id:v4()
            
        }
    }

    updateDentalRecord(updatedDentalRecord:DtoUpdatedDentalRecord, id:string){

    }

    deleteDentalRecord(id:string){

    }
}
