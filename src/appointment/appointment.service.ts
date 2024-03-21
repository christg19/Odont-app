import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from 'src/service/service.entity';
import Sequelize from 'sequelize';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Patient } from 'src/patient/patient.entity';

@Injectable()
export class AppointmentsService {

    constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment,
    @InjectModel(Patient) private patientModel: typeof Patient) { }

    async getAppointments(page: number, limit: number): Promise<Appointment[]> {
        const offset = (page - 1) * limit;
        
        const appointmentsWithService = await this.appointmentModel.findAndCountAll({
          include: [
            {
              model: Service,
              as: 'service',
              attributes: ['id', 'name', 'cost']
            },
           
          ],
          limit: limit,
          offset: offset,
        });
      
        return appointmentsWithService.rows;
      }
    
    

    async getAppointmentById(id: number): Promise<Appointment> {
      if(id <= 0){
        throw new Error("El ID no es valido");
      };
            const appointment = await this.appointmentModel.findOne({
                where: {
                    id: id
                }
            });

            if(!appointment){
                throw new NotFoundException('Cita no encontrada');
            }

            return appointment;
    }

    async createAppointment(dto: CreateAppointmentDto) {
        let services: Service[] = null;
        let servicesName: string[] = [];

        if (dto.serviceIds !== null && dto.serviceIds !== undefined) {
            services = await Service.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: dto.serviceIds
                    }
                }
            });
        }

        services.forEach((service)=>{
            servicesName.push(service.name)
        })
         
        
        const patient = await this.patientModel.findOne({
            where:{
                id:dto.patientId
            }
        })

        if (services.length === dto.serviceIds.length) {
            const appointmentData = {
                appointmentDate: dto.appointmentDate,
                patientName: patient.name,
                notes: dto.notes,
                servicesName: servicesName,
                totalCost: services.reduce((acc, value) => acc + value.cost, 0),
                patientId: dto.patientId,
            };

            const appointment = await this.appointmentModel.create(appointmentData);

            await appointment.$set('service', services);

            return appointment;
        } else {
            throw new Error('Algunos IDs de servicio proporcionados no son válidos.');
        }
    }

    async updateAppointment(dto: UpdateAppointmentDto, id: number) {
        if (id <= 0) {
            throw new BadRequestException('El ID de la cita no es válido')
        }

        const appointment = await this.appointmentModel.findOne({
            where: {
                id: id
            }
        });

        if(!appointment){
            throw new NotFoundException('Cita no encontrada')
        }

        await appointment.update(dto);
        return 'La cita fue actualizada correctamente'

    }

    async deleteAppointment(id: number) {
        if (id <= 0) {
            throw new BadRequestException('El ID de la cita no es válido');
        }
    
        const appointment = await this.appointmentModel.findOne({
            where: {
                id: id,
            },
        });
    
        if (!appointment) {
            throw new NotFoundException('Cita no encontrada');
        }
    
        await appointment.destroy();
        return 'Cita eliminada correctamente';
    }

}
