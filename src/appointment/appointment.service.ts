import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from 'src/service/service.entity';
import Sequelize from 'sequelize';

@Injectable()
export class AppointmentsService {
    
    constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment,
    @InjectModel(Service) private serviceModel: typeof Service){}

    async getAppointments(): Promise<Appointment[]>{
        const appointmentWithService = await Appointment.findAll({
            include: [
                {
                    model: Service,
                    as: 'service', 
                    attributes: ['id', 'name', 'cost']
                }
            ]
        });
        return appointmentWithService;
    }

    async getAppointmentById(id:number): Promise<Appointment>{
        return this.appointmentModel.findOne({
            where: {
                id:id
            }
        });
    }
 
    async createAppointment(dto: CreateAppointmentDto) {
        const services = await Service.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.serviceIds
                }
            }
        });
    
        if (services.length === dto.serviceIds.length) {
            const appointmentData = {
                appointmentDate: dto.appointmentDate,
                notes: dto.notes,
                patientId: dto.patientId
            };
    
            const appointment = await this.appointmentModel.create(appointmentData);
            
            await appointment.$set('service', services);
    
            return appointment;
        } else {
            throw new Error('Algunos IDs de servicio proporcionados no son válidos.');
        }
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
