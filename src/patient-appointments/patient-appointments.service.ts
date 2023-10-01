import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { clientInMemory } from 'src/db/storageInMemory';
import { procedimientos } from 'src/db/storageInMemory';
import { DtoAppointment, DtoUpdatedAppointment, DtoUserAppointment, DtoUserAppointmentWithId } from './appointment.dto';
import { v4 } from 'uuid';

@Injectable()
export class PatientAppointmentsService {

    private userAppointmentList: DtoUserAppointmentWithId[] = [{
        id: v4(),
        name: "Chris",
        desired_date:'2020-10-10',
        procedures:procedimientos
    }]
    

    private appointment: Appointment[] = [{
        id:v4(),
        patient: clientInMemory.name,
        date: "2023-10-1",
        procedures:procedimientos
    }]

    getAllAppointments(){
        return this.appointment
    }

    getOneAppointment(id:string){
        return this.appointment.find(appointment => appointment.id === id)
    }
    
    registerAppointment(newAppointment: DtoAppointment){

        const { patient, date, procedures } = newAppointment;

        const appointment:Appointment = {
            id: v4(),
            patient,
            date,
            procedures
        }

        this.appointment.push(appointment);

        return this.appointment;
    }

    updateAppointment(newAppointment:DtoUpdatedAppointment, id:string){
        let actualAppointment = this.appointment.find(appointment => appointment.id === id);

        const updatedAppointment: Appointment = {
            id: actualAppointment.id,
            patient: newAppointment.patient || actualAppointment.patient,
            date: newAppointment.date || actualAppointment.date,
            procedures: newAppointment.procedures || actualAppointment.procedures
        }

        this.deleteAppointment(actualAppointment.id);

        this.appointment.push(updatedAppointment);

        return updatedAppointment;
    }

    deleteAppointment(id:string){
        return this.appointment = this.appointment.filter(appointment => appointment.id !== id)
      
    }

    userRegisterAppointment(newUserAppointment:DtoUserAppointment){
        const { name, desired_date, procedures } = newUserAppointment;

        const userAppointment: DtoUserAppointmentWithId = {
            id: v4(),
            name: newUserAppointment.name,
            desired_date:newUserAppointment.desired_date,
            procedures: newUserAppointment.procedures
        }

        this.userAppointmentList.push(userAppointment)

        return this.userAppointmentList;


    }

}
