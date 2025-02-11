import { Injectable, Logger } from '@nestjs/common';
import { Appointment, AppointmentStatus } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from 'src/service/service.entity';
import Sequelize, { Op } from 'sequelize';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Patient } from 'src/patient/patient.entity';
import sequelize from 'sequelize';
import { Transaction } from 'sequelize';
import { Tooth } from 'src/tooth/tooth.entity';
import { AppointmentTooth } from './appointment-tooth.entity';

@Injectable()
export class AppointmentsService {
    private readonly logger = new Logger(AppointmentsService.name);

    constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment,
        @InjectModel(Patient) private patientModel: typeof Patient,
        @InjectModel(Tooth) private toothModel: typeof Tooth) { }

    async getAppointments(): Promise<Appointment[]> {


        const appointmentsWithService = await this.appointmentModel.findAndCountAll({
            include: [
                {
                    model: Service,
                    as: 'service',
                    attributes: ['id']
                },

            ],
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
        try {
          const patient = await this.patientModel.findByPk(dto.patientId, { transaction: t });
          if (!patient) {
            throw new NotFoundException('Paciente no encontrado.');
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
              throw new BadRequestException('Algunos IDs de servicio proporcionados no son válidos.');
            }
          }
      
          // Si dto.totalCost viene del frontend y no es undefined, lo usamos.
          // De lo contrario, si hay servicios, calculamos su costo total.
          let totalCost = dto.totalCost !== undefined 
            ? dto.totalCost 
            : services.reduce((acc, service) => acc + service.cost, 0);
      
          const appointmentData = {
            appointmentDate: dto.appointmentDate,
            patientName: patient.name,
            notes: dto.notes,
            serviceIds: dto.serviceIds,
            totalCost,
            patientId: patient.id,
          };
      
          const appointment = await this.appointmentModel.create(appointmentData, { transaction: t });
      
          if (services.length > 0) {
            await (appointment as any).setService(services, { transaction: t });
          }
      
          if (dto.toothIds && dto.toothIds.length > 0) {
            const teeth = await Tooth.findAll({
              where: {
                id: {
                  [Sequelize.Op.in]: dto.toothIds
                }
              },
              transaction: t
            });
      
            if (teeth.length !== dto.toothIds.length) {
              throw new BadRequestException('Algunos IDs de dientes proporcionados no son válidos.');
            }
      
            await Promise.all(
              dto.toothIds.map(toothId =>
                AppointmentTooth.create({ appointmentId: appointment.id, toothId }, { transaction: t })
              )
            );
          }
      
          await t.commit();
          return appointment;
        } catch (error) {
          await t.rollback();
          throw error;
        }
      }
      


    async findPendingPastAppointments(): Promise<Appointment[]> {
        const pendingAppointments = await this.appointmentModel.findAll({
          where: {
            status: AppointmentStatus.Pendiente,
            appointmentDate: Sequelize.literal(`CAST("appointmentDate" AS TIMESTAMP) < NOW()`),
          },
        });
      
        return pendingAppointments;
      }
      
      async updateBulkStatus(appointmentIds: number[], status: AppointmentStatus): Promise<void> {
        const [affectedCount] = await this.appointmentModel.update(
          { status },
          { where: { id: appointmentIds } }
        );
        this.logger.log(`Updated ${affectedCount} appointments to status ${status}`);
      }
      


    async updateAppointmentStatus(id: number, status: AppointmentStatus): Promise<void> {
        await this.appointmentModel.update(
            { status },
            { where: { id } },
        );
    }

    async findAppointmentsBetweenDates(startDate: Date, endDate: Date): Promise<Appointment[]> {
        return this.appointmentModel.findAll({
          where: {
            appointmentDate: {
              [Op.between]: [startDate, endDate],
            },
            status: AppointmentStatus.Pendiente,
          },
        });
      }

      async updateAppointment(dto: UpdateAppointmentDto, id: number) {
        const t = await this.appointmentModel.sequelize.transaction();
      
        try {
          if (id <= 0) {
            throw new BadRequestException('El ID de la cita no es válido');
          }
      
          const appointment = await this.appointmentModel.findOne({ where: { id }, transaction: t });
      
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
      
            // Solo recalculamos si dto.totalCost no está definido
            if (dto.totalCost === undefined) {
              dto.totalCost = services.reduce((acc, service) => acc + service.cost, 0);
            }
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
          await t.rollback();
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




