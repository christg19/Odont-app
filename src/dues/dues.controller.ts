import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DuesService } from './dues.service';
import { CreateDueDto, UpdateDueDto } from './dto/index';

@Controller('dues')
export class DuesController {
    constructor(private duesService:DuesService){ }

    @Get('getAll')
    getAllDues() {
        return this.duesService.getAll();
    }

    @Get('getDueById/:id')
    getDueById(@Param('id') id:number){
        return this.duesService.getDueById(id);
    }
    
    @Post('createDue')
    createDue(@Body() dto: CreateDueDto) {
        return this.duesService.createDue(dto)
    }
    
    @Put('updateDue/:id')
    updateDue(@Param('id') id:number, @Body() dto: UpdateDueDto){
        return this.duesService.updateDue(dto, id)
    }

    @Delete('deleteDue/:id')
    DeleteDue(@Param('id') id:number) {
        return this.duesService.deleteDue(id)
    }

}
