import { Body, Controller, Get,Post, Put, Delete, Param } from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto} from './dto';
import { ClientsService } from './patient.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('clients')
@ApiTags('patients')
export class ClientsController {
    constructor(private clientService: ClientsService){}

    @Get('getPatients')
    async getPatients() {
      return this.clientService.getAllPatients(); 
    }

    @Get('getPatientById/:id')
    getPatientById(@Param('id') id:number){
        return this.clientService.getOnePatient(id)
    }

    @Post('createPatient')
    createPatient(@Body() newPatient:CreatePatientDto){
        return this.clientService.createPatient(newPatient)
    }

    @Put('updatePatient/:id')
    updatePatient(@Param('id') id:number, @Body() updatedClient:UpdatePatientDto){
        return this.clientService.updatePatient(updatedClient, id)
    }

    @Delete('deletePatient/:id')
    deletePatient(@Param('id') id:number){
        return this.clientService.deletePatient(id)
    }
}
