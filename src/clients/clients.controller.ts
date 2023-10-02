import { Body, Controller, Get,Post, Put, Delete, Param } from '@nestjs/common';
import { DtoClient, DtoUpdatedClient } from './clients.dto/clientDto';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService){}

    @Get()
    getAllClients(): Promise<Client[]>{
        return this.clientService.getAllClients()
    }

    @Get(':id')
    getOneClient(@Param('id') id:number): Promise<Client>{
        return this.clientService.getOneClient(id)
    }

    @Post()
    registerClient(@Body() newClient:DtoClient){
        return this.clientService.createClient(newClient)
    }

    @Put(':id')
    updateClient(@Param('id') id:number, @Body() updatedClient:DtoUpdatedClient){
        return this.clientService.updateClient(updatedClient, id)
    }

    @Delete(':id')
    deleteClient(@Param('id') id:number){
        return this.clientService.deleteClient(id)
    }
}
