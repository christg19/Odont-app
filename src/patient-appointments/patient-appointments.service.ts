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
 
    async registerAppointment(newAppointment: DtoAppointment, userId:number){

        const cliente = await this.clientRepository.findOne({
            where: {
                id: userId
            }
        })

        const appointment = new Appointment();

        appointment.notes = newAppointment.notes;
        appointment.status = newAppointment.status;
        appointment.dateHour = newAppointment.dateHour;
        appointment.client = cliente;

        return this.appointmentRepository.save(appointment);

    }

    updateAppointment(newAppointment:DtoUpdatedAppointment, userId:number){
    
    }

    deleteAppointment(id:number){
       
      
    }
    
}
