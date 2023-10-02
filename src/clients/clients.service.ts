import { Injectable } from '@nestjs/common';
import { DtoUpdatedClient, DtoClient } from './clients.dto/clientDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm'

@Injectable()
export class ClientsService {

    constructor(@InjectRepository(Client) private clientRepository:Repository<Client>){}

    getAllClients(){
        return this.clientRepository.find();
    }

    getOneClient(id:number){
        return this.clientRepository.findOne({
            where: {
                id: id 
            }
        });
    }

    createClient(newClient: DtoClient){
        const client = this.clientRepository.create(newClient);
        return this.clientRepository.save(client);
    }

    updateClient(newClient: DtoUpdatedClient, id:number){
        return this.clientRepository.update({id}, newClient)
    }

    deleteClient(id: number){
        return this.clientRepository.delete(id)
    }
}
