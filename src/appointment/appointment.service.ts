<<<<<<< HEAD
=======
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
import { Product } from 'src/product/product.entity';
import { Categories } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment,
    @InjectModel(Patient) private patientModel: typeof Patient,
    @InjectModel(Tooth) private toothModel: typeof Tooth,
    private productService: ProductService) { }

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
  
      // Validación de productos en los servicios seleccionados, usando productUsages
      for (const service of services) {
        if (service.productUsages && service.productUsages.length > 0) {
          for (const usage of service.productUsages) {
            const numericProdId = Number(usage.productId);
            // Se obtiene el producto. Asegúrate de que getOneProduct retorne un Promise<Product>.
            const product = await this.productService.getOneProduct(numericProdId);
            // Validar si es instrumental y no está esterilizado.
            if (
              product &&
              product.categoryProduct &&
              product.categoryProduct.toUpperCase() === "INSTRUMENTAL" &&
              product.instrumentalState !== true
            ) {
              throw new BadRequestException(
                `El producto instrumental "${product.name}" (ID: ${product.id}) no está esterilizado. Debe limpiarse antes de agendar la cita.`
              );
            }
            // Validar expiración: si existe expiryDate y es anterior a la fecha actual.
            if (
              product &&
              product.expiryDate &&
              new Date(product.expiryDate) <= new Date()
            ) {
              throw new BadRequestException(
                `El producto "${product.name}" (ID: ${product.id}) ha expirado. Debe reemplazarse antes de agendar la cita.`
              );
            }
          }
        }
      }
  
      // Calcular el costo total (si no viene definido)
      let totalCost = dto.totalCost !== undefined
        ? dto.totalCost
        : services.reduce((acc, service) => acc + service.cost, 0);

          const appointmentDate = new Date(dto.appointmentDate).toISOString();
          this.logger.log(`Creando cita para el paciente ${patient.name} en la fecha ${appointmentDate}`);
        const appointmentData = {
          appointmentDate: appointmentDate,
          patientName: patient.name,
          notes: dto.notes,
          serviceIds: dto.serviceIds,
          totalCost,
          patientId: patient.id,
        };
    
        const appointment = await this.appointmentModel.create(appointmentData, { transaction: t });
      this.logger.log(`Procesando servicios para la cita ${appointment.id}: ${appointment.serviceIds}`);
  
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

  async getAppointmentsWithServicesByIds(appointmentIds: number[]): Promise<Appointment[]> {
    return this.appointmentModel.findAll({
      where: { id: appointmentIds },
      include: [{
        model: Service,
        as: 'service',
        attributes: ['id', 'productIds']
      }],
    });
  }
  
  async updateBulkStatusOnly(appointmentIds: number[], status: AppointmentStatus): Promise<void> {
    this.logger.log(`Updating appointment status only for appointments: ${appointmentIds}`);
    const [affectedCount] = await this.appointmentModel.update(
      { status },
      { where: { id: appointmentIds } }
    );
    this.logger.log(`Updated ${affectedCount} appointments to status ${status}`);
  }
  
  async updateBulkStatus(appointmentIds: number[], status: AppointmentStatus): Promise<void> {
    this.logger.log(`Iniciando updateBulkStatus para citas: ${appointmentIds}`);
  
    const [affectedCount] = await this.appointmentModel.update(
      { status },
      { where: { id: appointmentIds } }
    );
    this.logger.log(`Se actualizaron ${affectedCount} citas a estado ${status}`);
  
    // Procesar cada cita completada:
    const appointments = await this.appointmentModel.findAll({
      where: { id: appointmentIds },
      include: [{
        model: Service,
        as: 'service', // Asegurarse de que este alias coincide con el definido en el modelo
        attributes: ['id', 'productIds']
      }],
    });
    this.logger.log(`Se obtuvieron las siguientes citas con servicios: ${JSON.stringify(appointments.map(a => ({ id: a.id, services: a.service.map(s => s.id) })))} `);
  
    for (const appointment of appointments) {
      this.logger.log(`Procesando cita ${appointment.id}`);
      // Iterar sobre appointment.service (la lista de servicios asociados)
      for (const service of appointment.service) {

    if (service.productUsages && service.productUsages.length > 0) {
  for (const usage of service.productUsages) {
    const prodId = usage.productId;
    const usageQuantity = usage.quantity;
    this.logger.log(`Procesando producto ${prodId} para el servicio ${service.id} (cantidad: ${usageQuantity})`);
    try {
      const product = await this.productService.getOneProduct(prodId);
      if (product) {
        this.logger.log(`Producto ${product.id} encontrado con categoría ${product.categoryProduct}`);
        if (product.categoryProduct.toUpperCase() === "INSTRUMENTO") {
          await this.productService.markInstrumentAsNotSterile(prodId);
          this.logger.log(`Producto ${prodId} marcado como no esterilizado`);
        } else if (product.categoryProduct.toUpperCase() === "DESECHABLE") {
          this.logger.log(`Reduciendo cantidad del producto desechable ${prodId} en ${usageQuantity}`);
          if (product.quantity >= usageQuantity) {
            const updatedProduct = await product.update({ quantity: product.quantity - usageQuantity });
            this.logger.log(`Producto ${prodId} actualizado, nueva cantidad: ${updatedProduct.quantity}`);
          } else {
            const deletedProduct = await product.destroy();
            this.logger.log(`Producto ${prodId} destruido por cantidad insuficiente`);
          }
        } else if (product.categoryProduct.toUpperCase() === "QUIMICO") {
          this.logger.log(`Reduciendo cantidad del producto químico ${prodId} en ${usageQuantity}`);
          const updatedProduct = await product.update({ quantity: product.quantity - usageQuantity });
          this.logger.log(`Producto ${prodId} actualizado, nueva cantidad: ${updatedProduct.quantity}`);
        }
      } else {
        this.logger.warn(`No se encontró producto con id ${prodId}`);
      }
    } catch (error) {
      this.logger.error(`Error al procesar el producto ${prodId}: ${error.message}`, error.stack);
    }
  }
} else {
  this.logger.log(`El servicio ${service.id} no tiene productUsages para procesar.`);
}
      }
    }
    this.logger.log(`Finalizado updateBulkStatus para citas: ${appointmentIds}`);
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




>>>>>>> 0b059f54a7a49b9e983b323fd2aa1ed8a7e79445
