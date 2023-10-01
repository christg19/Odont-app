import { Controller, Get, Post, Delete } from '@nestjs/common';
import { PatientAppointmentsService } from './patient-appointments.service';

@Controller('patient-appointments')
export class PatientAppointmentsController {

    constructor(private appointmentService: PatientAppointmentsService) { }

    @Get()
    getAllAppointments() {
        return this.appointmentService.getAllAppointments()
    }

    @Post()
    RegisterAppointment() {
        return this.appointmentService.registerAppointment()
    }

    @Delete()
    DeleteAppointment() {
        return this.appointmentService.deleteAppointment()
    }

}
