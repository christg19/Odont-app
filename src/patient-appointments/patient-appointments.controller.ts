import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PatientAppointmentsService } from './patient-appointments.service';
import { DtoAppointment, DtoUpdatedAppointment } from './appointment.dto';

@Controller('patient-appointments')
export class PatientAppointmentsController {

    constructor(private appointmentService: PatientAppointmentsService) { }

    @Get()
    getAllAppointments() {
        return this.appointmentService.getAllAppointments()
    }

    @Post()
    registerAppointment(@Body() newAppointment:DtoAppointment) {
        return this.appointmentService.registerAppointment(newAppointment)
    }
    
    @Put(':id')
    updateAppointment(@Param('id') id:number, @Body() updatedAppointment:DtoUpdatedAppointment){
        return this.appointmentService.updateAppointment(updatedAppointment, id)
    }

    @Delete(':id')
    DeleteAppointment(@Param('id') id:number) {
        return this.appointmentService.deleteAppointment(id)
    }

}
