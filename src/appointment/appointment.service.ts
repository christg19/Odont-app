import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { DentalRecord } from 'src/dental-record/dental-record.entity';

@Injectable()
export class AppointmentsService {
    
    constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment){}

    async getAppointments(): Promise<Appointment[]>{
       return this.appointmentModel.findAll();
    }

    async getAppointmentById(id:number): Promise<Appointment>{
        return this.appointmentModel.findOne({
            where: {
                id:id
            }
        });
    }
 
    async createAppointment(dto: CreateAppointmentDto){
        this.appointmentModel.create(dto);
       

    }

    async updateAppointment(dto: UpdateAppointmentDto, id:number){
        const appointment = await this.appointmentModel.findOne({
            where:{
                id:id
            }
        });

        await appointment.update(dto);
    }

    async deleteAppointment(id:number){
      const appointment = await this.appointmentModel.findOne({
        where:{
            id:id
        }
      });

      return appointment.destroy()
    
    }
    
}
