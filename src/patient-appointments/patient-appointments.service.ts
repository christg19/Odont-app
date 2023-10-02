import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { DtoAppointment, DtoUpdatedAppointment } from './appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/client.entity';


@Injectable()
export class PatientAppointmentsService {
    
    constructor(@InjectRepository(Client) private clientRepository:Repository<Client>,
    @InjectRepository(Appointment) private appointmentRepository:Repository<Appointment>){}

    getAllAppointments(){
       return this.appointmentRepository.find();
    }

    getOneAppointment(id:number){
        return this.appointmentRepository.findOne({
            where:{
                id: id
            }
        })
    }
 
    async registerAppointment(newAppointment: DtoAppointment){

        const cliente = await this.clientRepository.findOne({
            where: {
                id: newAppointment.userId
            }
        })

        const appointment = new Appointment();

        appointment.notes = newAppointment.notes;
        appointment.status = newAppointment.status;
        appointment.dateHour = newAppointment.dateHour;
        appointment.client = cliente;
        appointment.clientName = cliente.name;

        return this.appointmentRepository.save(appointment);

    }

    updateAppointment(newAppointment:DtoUpdatedAppointment, userId:number){
        this.appointmentRepository.update(userId, newAppointment)
    }

    deleteAppointment(id:number){
       return this.appointmentRepository.delete(id)
    
    }
    
}
