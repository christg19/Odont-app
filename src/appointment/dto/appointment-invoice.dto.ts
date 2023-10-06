import { Service } from "src/service/service.entity";
import { Appointment } from "../appointment.entity";

export class interfaceAppointmentDto {

    appointmentDate:Date;

    notes:string;

    patientId:number

    service: Service[];

    constructor(appointment:Appointment){
        this.appointmentDate = appointment.appointmentDate
        this.notes = appointment.notes
        this.service = appointment.service
        this.patientId = appointment.patientId
    }

}