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
            throw new BadRequestException('El ID de la cita no es válido');
        }
    
        const appointment = await this.appointmentModel.findOne({
            where: { id }
        });
    
        if (!appointment) {
            throw new NotFoundException('Cita no encontrada');
        }
    
        let services: Service[] = [];
        let servicesName: string[] = [];
    
      
        if (dto.serviceIds && dto.serviceIds.length > 0) {
            services = await Service.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: dto.serviceIds
                    }
                }
            });
    
            servicesName = services.map(service => service.name);
    
            if (services.length !== dto.serviceIds.length) {
                throw new Error('Algunos IDs de servicio proporcionados no son válidos.');
            }
    
           
            dto.servicesName = servicesName;
            dto.totalCost = services.reduce((acc, service) => acc + service.cost, 0);
        }
    
     
        if (dto.patientId) {
            const patient = await this.patientModel.findOne({
                where: { id: dto.patientId }
            });
    
            if (!patient) {
                throw new NotFoundException('Paciente no encontrado');
            }
    
            dto.patientName = patient.name;
        }
    

        await appointment.update(dto);
    

        if (services.length > 0) {
            await appointment.$set('service', services);
        }
    
        return appointment;
    }
    

    async deleteAppointment(id: number) {
        if (id <= 0) {
            throw new BadRequestException('El ID de la cita no es válido');
        }
    
        const appointment = await this.appointmentModel.findOne({
            where: { id },
            include: [{
                model: Service,
                as: 'service'
            }]
        });
    
        if (!appointment) {
            throw new NotFoundException('Cita no encontrada');
        }
    
        if (appointment.service && appointment.service.length > 0) {
            for (const service of appointment.service) {
                await service.update({ appointmentId: null });
            }
        }
    
       
        await appointment.destroy();
        return 'Cita eliminada correctamente';
    }
    

}
