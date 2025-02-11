import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { SetMetadata } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);


@Controller('patient-appointments')
@ApiTags('appointment')
@ApiBearerAuth()
// @UseGuards(AuthGuard)
export class PatientAppointmentsController {

    constructor(private appointmentService: AppointmentsService) { }

    @Get('all')
    getAllAppointments() {
        return this.appointmentService.getAppointments();
    }

    @Get(':id')
    getAppointmentById(@Param('id') id:number){
        return this.appointmentService.getAppointmentById(id);
    }
    
    @Post('')
    createAppointment(@Body() dto: CreateAppointmentDto) {
        return this.appointmentService.createAppointment(dto)
    }
    
    @Put(':id')
    updateAppointment(@Param('id') id:number, @Body() dto: UpdateAppointmentDto){
        return this.appointmentService.updateAppointment(dto, id)
    }

    @Delete(':id')
    deleteAppointment(@Param('id') id:number) {
        return this.appointmentService.deleteAppointment(id)
    }

}
