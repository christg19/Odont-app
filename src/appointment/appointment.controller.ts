import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { SetMetadata } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);


@Controller('patient-appointments')
@UseGuards(AuthGuard)
export class PatientAppointmentsController {

    constructor(private appointmentService: AppointmentsService) { }

    @Get('getAllAppointments')
    getAllAppointments() {
        return this.appointmentService.getAppointments()
    }

    @Post('createAppointment')
    createAppointment(@Body() dto: CreateAppointmentDto) {
        return this.appointmentService.createAppointment(dto)
    }
    
    @Put('updateAppointment/:id')
    updateAppointment(@Param('id') id:number, @Body() dto: UpdateAppointmentDto){
        return this.appointmentService.updateAppointment(dto, id)
    }

    @Delete('deleteAppointment/:id')
    DeleteAppointment(@Param('id') id:number) {
        return this.appointmentService.deleteAppointment(id)
    }

}
