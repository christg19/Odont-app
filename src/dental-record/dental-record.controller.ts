import { Body, Controller, Delete, Get, Param,Post, Put } from '@nestjs/common';
import { DentalRecordService } from './dental-record.service';

@Controller('dental-record')
export class DentalRecordController {

    constructor(private dentalRecordService:DentalRecordService){}

    @Get()
    getAllDentalRecords(){
        return this.dentalRecordService.getAllDentalRecords()
    }

    @Get(':id')
    getOneDentalRecord(@Param('id') id:string ){
        return this.dentalRecordService.getOneDentalRecord(id)
    }

    @Post()
    registerDentalRecord(@Body() newDentalRecord:DtoDentalRecord){
        return this.dentalRecordService.registerDentalRecord(newDentalRecord)
    }

    @Put(':id')
    updateDentalRecord(@Param('id') id:string, @Body() updatedDentalRecord:DtoUpdatedDentalRecord){
        return this.dentalRecordService.updateDentalRecord(updatedDentalRecord, id)
    }

    @Delete(':id')
    deleteDentalRecord(@Param('id') id:string){
        return this.dentalRecordService.deleteDentalRecord(id)
    }

}
