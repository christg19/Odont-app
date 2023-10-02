import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class DentalRecordService {

    private dentalRecordInMemory:DtoDentalRecord = [{
        id:,

    }]

    getAllDentalRecords(){

    }
    
    getOneDentalRecord(id:string){

    }

    registerDentalRecord(newDentalRecord:DtoDentalRecord, userId:string){
        const dentalRecord:DentalRecord = {
            id:v4(),
            
        }
    }

    updateDentalRecord(updatedDentalRecord:DtoUpdatedDentalRecord, id:string){

    }

    deleteDentalRecord(id:string){

    }
}
