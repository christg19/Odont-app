import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from 'src/service/service.entity';
import Sequelize from 'sequelize';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Patient } from 'src/patient/patient.entity';
import sequelize from 'sequelize';
import { Transaction } from 'sequelize';

@Injectable()
export class AppointmentsService {

    constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment,
        @InjectModel(Patient) private patientModel: typeof Patient) { }

    async getAppointments(page: number, limit: number): Promise<Appointment[]> {
        const offset = (page - 1) * limit;

        const appointmentsWithService = await this.appointmentModel.findAndCountAll({
            // include: [
            //     {
            //         model: Service,
            //         as: 'service',
            //         attributes: ['id']
            //     },

            // ],
            limit: limit,
            offset: offset,
        });

        return appointmentsWithService.rows;
    }



    async getAppointmentById(id: number): Promise<Appointment> {
        const t = await this.appointmentModel.sequelize.transaction();
        try {
            if (id <= 0) {
                throw new Error("El ID no es valido");
            };
            const appointment = await this.appointmentModel.findOne({
                where: {
                    id: id
                },
                // include: [
                //     {
                //         model: Service,
                //         as: 'service',
                //         attributes: ['id']
                //     },
                // ],
                transaction: t
            });

            if (!appointment) {
                throw new NotFoundException('Cita no encontrada');
            }
            t.commit();
            return appointment;
        } catch (error) {
            t.rollback();
            throw error;
        }

    }

    async createAppointment(dto: CreateAppointmentDto) {
        const t = await this.appointmentModel.sequelize.transaction();
        let serviceIds:number[];
        try {
            const patient = await this.patientModel.findByPk(dto.patientId, { transaction: t });
            if (!patient) {
                throw new NotFoundException('Paciente no encontrado.');
            }

            const services = await Service.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: dto.serviceIds
                    }
                },
                transaction: t

            });

            if (services.length !== dto.serviceIds.length) {
                throw new BadRequestException('Algunos IDs de servicio proporcionados no son válidos.');
            }

            const totalCost = services.reduce((acc, service) => acc + service.cost, 0);
            const appointmentData = {
                appointmentDate: dto.appointmentDate,
                patientName: patient.name,
                notes: dto.notes,
                serviceIds: dto.serviceIds,
                totalCost,
                patientId: patient.id,
            };

            const appointment = await this.appointmentModel.create(appointmentData, { transaction: t });
            await (appointment as any).setService(services, { transaction: t });
            t.commit();
            return appointment;
        } catch (error) {
            t.rollback();
            throw error;
        }

    }



    async updateAppointment(dto: UpdateAppointmentDto, id: number) {
        const t = await this.appointmentModel.sequelize.transaction();

        try {
            if (id <= 0) {
                throw new BadRequestException('El ID de la cita no es válido');
            }

            const appointment = await this.appointmentModel.findOne({
                where: { id },
                transaction: t
            });

            if (!appointment) {
                throw new NotFoundException('Cita no encontrada');
            }

            let services: Service[] = [];

            if (dto.serviceIds && dto.serviceIds.length > 0) {
                services = await Service.findAll({
                    where: {
                        id: {
                            [Sequelize.Op.in]: dto.serviceIds
                        }
                    },
                    transaction: t
                });

                if (services.length !== dto.serviceIds.length) {
                    throw new Error('Algunos IDs de servicio proporcionados no son válidos.');
                }



                dto.totalCost = services.reduce((acc, service) => acc + service.cost, 0);
            }


            if (dto.patientId) {
                const patient = await this.patientModel.findOne({
                    where: { id: dto.patientId },
                    transaction: t
                });

                if (!patient) {
                    throw new NotFoundException('Paciente no encontrado');
                }

                dto.patientName = patient.name;
            }


            await appointment.update(dto, { transaction: t });


            if (services.length > 0) {
                await (appointment as any).setService(services, { transaction: t });
            }

            await t.commit()
            return appointment;
        } catch (error) {
            t.rollback();
            throw error
        }


    }


    async deleteAppointment(id: number) {
        const t = await this.appointmentModel.sequelize.transaction();
        try {
            if (id <= 0) {
                throw new BadRequestException('El ID de la cita no es válido');
            }

            const appointment = await this.appointmentModel.findOne({ where: { id }, transaction: t });

            if (!appointment) {
                throw new NotFoundException('Cita no encontrada');
            }

            await (appointment as any).setService([], { transaction: t });
            await appointment.destroy({ transaction: t });

            await t.commit();
            
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }




}
