import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto} from './dto'

@Controller('service')
export class ServiceController {

    constructor (private serviveService:ServiceService){}

    @Get()
    getAllServices(){
        return this.serviveService.getAll()
    }

    @Get(':id')
    getOneService(@Param('id') id:number){
        return this.serviveService.getOne(id)
    }

    @Post()
    createService(@Body() dto:CreateServiceDto){
        return this.serviveService.create(dto)
    }

    @Put(':id')
    updateService(@Param('id') id:number, @Body() dto:UpdateServiceDto){
        return this.serviveService.update(dto, id)
    }

    @Delete(':id')
    deleteService(@Param('id') id:number){
        return this.serviveService.delete(id)
    }
}
