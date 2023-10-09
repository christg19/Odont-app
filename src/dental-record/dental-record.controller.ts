import { Body, Controller, Delete, Get, Param,Post, Put } from '@nestjs/common';
import { DentalRecordService } from './dental-record.service';
import { CreateDentalRecordDto, UpdateDentalRecordDto } from './dto';

@Controller('dental-record')
export class DentalRecordController {

    constructor(private dentalRecordService:DentalRecordService){}

    @Get('getAllDentalRecords')
    getAllDentalRecords(){
        return this.dentalRecordService.getAllDentalRecords()
    }

    @Get('getOneDentalRecord/:id')
    getOneDentalRecord(@Param('id') id:number ){
        return this.dentalRecordService.getOneDentalRecord(id)
    }

    @Post('registerDentalRecord')
    registerDentalRecord(@Body() dto: CreateDentalRecordDto ){
        return this.dentalRecordService.createDentalRecord(dto)
    }

    @Put('updateDentalRecord/:id')
    updateDentalRecord(@Param('id') id:number, @Body() dto: UpdateDentalRecordDto){
        return this.dentalRecordService.updateDentalRecord(dto, id)
    }

    @Delete('deleteDentalRecord/:id')
    deleteDentalRecord(@Param('id') id:number){
        return this.dentalRecordService.deleteDentalRecord(id)
    }

}
