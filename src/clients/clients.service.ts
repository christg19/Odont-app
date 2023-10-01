import { Injectable } from '@nestjs/common';
import { AppointmentsStatus, Client } from './client.entity';
import { DtoUpdatedClient, DtoClient } from './clients.dto/clientDto';
import { v4 } from 'uuid'

@Injectable()
export class ClientsService {

    private clientInMemory:Client[] = [{
        id:v4(),
        name:"Chris",
        id_cedula:"402-3181906-7",
        age:21,
        tel:"829-533-2795",
        appointment:AppointmentsStatus.NONE,
    }]

    getAllClients(){
        return this.clientInMemory
    }

    getOneClient(id:string):Client{
        return this.clientInMemory.find(client => client.id === id)
    }

    createClient(newClient: DtoClient){
        const { name, id_cedula, age, tel } = newClient;

        const client:Client = {
            id: v4(),
            name,
            id_cedula,
            age,
            tel,
            appointment: AppointmentsStatus.NONE
        };

        this.clientInMemory.push(client);

        return this.clientInMemory;
    }

    updateClient(newClient: DtoUpdatedClient, id:string){

        let actualClient = this.clientInMemory.find(client => client.id === id)

        const updatedClient:Client = {
            id: actualClient.id,
            name: newClient.name || actualClient.name,
            id_cedula: newClient.id_cedula || actualClient.id_cedula,
            age: newClient.age || actualClient.age,
            tel: newClient.tel || actualClient.tel,
            appointment: newClient.appointment || actualClient.appointment
        };

        this.deleteClient(actualClient.id);

        this.clientInMemory.push(updatedClient);

        return updatedClient;
    }

    deleteClient(id: string){
        return this.clientInMemory = this.clientInMemory.filter(client => client.id !== id)
    }
}
