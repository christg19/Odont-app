import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from 'src/service/service.entity';
import Sequelize from 'sequelize';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppointmentsService {

    constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment) { }

    async getAppointments(page: number, limit: number): Promise<{ items: Appointment[]; total: number }> {
        const offset = (page - 1) * limit;
        
        const appointmentsWithService = await Appointment.findAndCountAll({
            include: [
                {
                    model: Service,
                    as: 'service',
                    attributes: ['id', 'name', 'cost']
                }
            ],
            limit: limit,
            offset: offset,
        });
    
        return {
            items: appointmentsWithService.rows,
            total: appointmentsWithService.count,
        };
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

        if (dto.serviceIds !== null && dto.serviceIds !== undefined) {
            services = await Service.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: dto.serviceIds
                    }
                }
            });
        }

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
