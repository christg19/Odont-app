import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { clientInMemory } from 'src/db/storageInMemory';
import { procedimientos } from 'src/db/storageInMemory';

@Injectable()
export class PatientAppointmentsService {

    

    private appointment: Appointment[] = [{
        patient: clientInMemory.name,
        date: "2023-10-1",
        procedures:procedimientos
    }]

    getAllAppointments(){
        return this.appointment
    }
    
    registerAppointment(){
        
    }

    deleteAppointment(){

    }
}
