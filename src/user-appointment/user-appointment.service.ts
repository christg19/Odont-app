import { Injectable } from '@nestjs/common';
import { DtoUserAppointmentWithId, DtoUserAppointment } from 'src/patient-appointments/appointment.dto';
import { procedimientos } from 'src/db/storageInMemory';
import { v4 } from 'uuid';


@Injectable()
export class UserAppointmentService {

    private userAppointmentList: DtoUserAppointmentWithId[] = [{
        id: v4(),
        name: "Chris",
        desired_date:'2020-10-10',
        procedures:procedimientos
    }]

    getAllUserAppointment(){
        return this.userAppointmentList
    }

    getUserAppointment(id:string){
        return this.userAppointmentList.find(userAppointment => userAppointment.id === id)
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
