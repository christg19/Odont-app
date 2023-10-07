import { Body, Controller, Delete, Get, Param,Post, Put } from '@nestjs/common';
import { DentalRecordService } from './dental-record.service';
import { CreateDentalRecordDto, UpdateDentalRecordDto } from './dto';

@Controller('dental-record')
export class DentalRecordController {

    constructor(private dentalRecordService:DentalRecordService){}

    @Get()
    getAllDentalRecords(){
        return this.dentalRecordService.getAllDentalRecords()
    }

    @Get(':id')
    getOneDentalRecord(@Param('id') id:number ){
        return this.dentalRecordService.getOneDentalRecord(id)
    }

    @Post()
    registerDentalRecord(@Body() dto: CreateDentalRecordDto ){
        return this.dentalRecordService.createDentalRecord(dto)
    }

    @Put(':id')
    updateDentalRecord(@Param('id') id:number, @Body() dto: UpdateDentalRecordDto){
        return this.dentalRecordService.updateDentalRecord(dto, id)
    }

    @Delete(':id')
    deleteDentalRecord(@Param('id') id:number){
        return this.dentalRecordService.deleteDentalRecord(id)
    }

}
