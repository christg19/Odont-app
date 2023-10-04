import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';

@Controller('patient-appointments')
export class PatientAppointmentsController {

    constructor(private appointmentService: AppointmentsService) { }

    @Get()
    getAllAppointments() {
        return this.appointmentService.getAppointments()
    }

    @Post()
    createAppointment(@Body() dto: CreateAppointmentDto) {
        return this.appointmentService.createAppointment(dto)
    }
    
    @Put(':id')
    updateAppointment(@Param('id') id:number, @Body() dto: UpdateAppointmentDto){
        return this.appointmentService.updateAppointment(dto, id)
    }

    @Delete(':id')
    DeleteAppointment(@Param('id') id:number) {
        return this.appointmentService.deleteAppointment(id)
    }

}
