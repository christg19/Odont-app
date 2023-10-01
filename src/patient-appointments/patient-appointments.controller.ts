import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PatientAppointmentsService } from './patient-appointments.service';
import { DtoAppointment, DtoUserAppointment } from './appointment.dto';

@Controller('patient-appointments')
export class PatientAppointmentsController {

    constructor(private appointmentService: PatientAppointmentsService) { }

    @Get()
    getAllAppointments() {
        return this.appointmentService.getAllAppointments()
    }
    
    // Ver citas prog by users
    @Get()
    getAllUserAppointment(){
        return this.appointmentService.getAllUserAppointment()
    }

    // Ver cita de user por id 
    @Get(':id')
    getOneUserAppointment(@Param('id') id:string){
        return this.appointmentService.getUserAppointment(id)
    }

    @Post()
    RegisterAppointment(@Body() newAppointment:DtoAppointment) {
        return this.appointmentService.registerAppointment(newAppointment)
    }

    // Citas por parte del user
    @Post()
    UserRegisterAppointment(@Body() newUserAppointment:DtoUserAppointment){
        return this.appointmentService.userRegisterAppointment(newUserAppointment)
    }

    @Delete(':id')
    DeleteAppointment(@Param('id') id:string) {
        return this.appointmentService.deleteAppointment(id)
    }

}
