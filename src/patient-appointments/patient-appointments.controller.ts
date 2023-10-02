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

    @Post()
    RegisterAppointment(@Body() newAppointment:DtoAppointment) {
        return this.appointmentService.registerAppointment(newAppointment)
    }

    @Delete(':id')
    DeleteAppointment(@Param('id') id:string) {
        return this.appointmentService.deleteAppointment(id)
    }

}
