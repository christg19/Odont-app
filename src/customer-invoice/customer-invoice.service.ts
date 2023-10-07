import { Injectable } from '@nestjs/common';
import { CustomerInvoice } from './customer-invoice.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerInvoiceDto} from './dto';
import { Patient } from 'src/patient/patient.entity';
import { Service } from 'src/service/service.entity';
import { Appointment } from 'src/appointment/appointment.entity';

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

        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId,
            },
            include: [
                {
                    model: Patient, 
                    attributes: ['id', 'name'], 
                },
                {
                    model: Service, 
                    attributes: ['id',"name", 'cost'],
                },
            ],
        });

        if (!appointment) {
            throw new Error('Cita no encontrada');
        }

        const totalCost:number = appointment.service.reduce((total, service) => total + service.cost, 0);
        const serviceIds: Service[] = appointment.service.map(service => service);

   
        const customerInvoice:CustomerInvoice = await this.customerInvoiceModel.create({
            patientName: appointment.patient.name,
            patientId:appointment.patientId,
            cost: totalCost,
            dateAppointment: appointment.appointmentDate,
            appointmentId: appointment.id,
            service: serviceIds
        });

        return customerInvoice;
    }
}
    
    