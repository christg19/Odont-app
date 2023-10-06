import { Injectable } from '@nestjs/common';
import { CustomerInvoice } from './customer-invoice.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerInvoiceDto} from './dto';
import { Patient } from 'src/patient/patient.entity';
import { Service } from 'src/service/service.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { interfaceAppointmentDto } from 'src/appointment/dto';

@Injectable()
export class CustomerInvoiceService {
    constructor(@InjectModel(CustomerInvoice) private customerInvoiceModel: typeof CustomerInvoice,
        @InjectModel(Patient) private patientModel: typeof Patient,
        @InjectModel(Appointment) private appointmentModel: typeof Appointment) { }

    async getCustomerInvoices(): Promise<CustomerInvoice[]> {
        return this.customerInvoiceModel.findAll();
    }

    async getCustomerInvoiceById(id: number): Promise<CustomerInvoice> {
        return this.customerInvoiceModel.findOne({
            where: {
                id: id
            }
        })
    }

    async createCustomerInvoice(dto: CreateCustomerInvoiceDto) {
        const { appointmentId } = dto;

        // Buscar el Appointment por su id
        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId,
            },
            include: [
                {
                    model: Patient, // Incluir el modelo Patient para obtener el patientId
                    attributes: ['id', 'name'], // Seleccionar solo las propiedades necesarias
                },
                {
                    model: Service, // Incluir el modelo Service para obtener los servicios
                    attributes: ['id', 'cost'], // Seleccionar solo las propiedades necesarias
                },
            ],
        });

        if (!appointment) {
            throw new Error('Cita no encontrada');
        }

        const totalCost = appointment.services.reduce((total, service) => total + service.cost, 0);

        // Crear la factura del cliente
        const customerInvoice = await this.customerInvoiceModel.create({
            patientName: appointment.patient.name,
            cost: totalCost,
            dateAppointment: appointment.appointmentDate,
            appointmentId: appointment.id,
        });

        return customerInvoice;
    }
}
    
    