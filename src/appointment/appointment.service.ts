import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from 'src/service/service.entity';
import Sequelize from 'sequelize';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppointmentsService {

    constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment,
        @InjectModel(Service) private serviceModel: typeof Service) { }

    async getAppointments(): Promise<Appointment[]> {
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

    async getAppointmentById(id: number): Promise<Appointment> {
        if (id !== null && undefined) {
            return this.appointmentModel.findOne({
                where: {
                    id: id
                }
            });
        } else {
            throw new Error("El ID no es valido")
        }
    }

    async createAppointment(dto: CreateAppointmentDto) {
        let services: Service[] = null;

        if (dto.serviceIds !== null && undefined) {
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
