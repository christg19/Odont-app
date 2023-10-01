import { Body, Controller, Get,Post, Put, Delete, Param } from '@nestjs/common';
import { DtoClient, DtoUpdatedClient } from './clients.dto/clientDto';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService){}

    @Get()
    getAllClients(){
        return this.clientService.getAllClients()
    }

    @Get(':id')
    getOneClient(@Param('id') id:string){
        return this.clientService.getOneClient(id)
    }

    @Post()
    RegisterClient(@Body() newClient:DtoClient){
        return this.clientService.createClient(newClient)
    }

    @Put(':id')
    UpdateClient(@Param('id') id:string, @Body() updatedClient:DtoUpdatedClient){
        return this.clientService.updateClient(updatedClient, id)
    }

    @Delete(':id')
    DeleteClient(@Param('id') id:string){
        return this.clientService.deleteClient(id)
    }
}
