import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserAppointmentService } from './user-appointment.service';
import { DtoAppointment } from 'src/patient-appointments/appointment.dto';

@Controller('user-appointment')
export class UserAppointmentController {

    constructor(private userAppointmentService:UserAppointmentService){}

    // Ver citas prog by users
    @Get()
    getAllUserAppointment(){
        return this.userAppointmentService.getAllUserAppointment()
    }

    // Ver cita de user por id 
    @Get(':id')
    getOneUserAppointment(@Param('id') id:string){
        return this.userAppointmentService.getUserAppointment(id)
    }

    // Citas por parte del user
    @Post()
    UserRegisterAppointment(@Body() newUserAppointment:DtoAppointment){
        return this.userAppointmentService.userRegisterAppointment(newUserAppointment)
    }

}
