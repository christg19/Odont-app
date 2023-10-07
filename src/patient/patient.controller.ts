import { Body, Controller, Get,Post, Put, Delete, Param } from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto} from './dto';
import { ClientsService } from './patient.service';

@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService){}

    @Get()
    getPatients(){
        return this.clientService.getAllPatients()
    }

    @Get(':id')
    getPatientById(@Param('id') id:number){
        return this.clientService.getOnePatient(id)
    }

    @Post()
    createPatient(@Body() newPatient:CreatePatientDto){
        return this.clientService.createPatient(newPatient)
    }

    @Put(':id')
    updatePatient(@Param('id') id:number, @Body() updatedClient:UpdatePatientDto){
        return this.clientService.updatePatient(updatedClient, id)
    }

    @Delete(':id')
    deletePatient(@Param('id') id:number){
        return this.clientService.deletePatient(id)
    }
}
