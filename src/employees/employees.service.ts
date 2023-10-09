import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdatedEmployeeDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmployeesService {

    constructor(@InjectModel(Employee) private employeeModel: typeof Employee) { }

    async getEmployees(): Promise<Employee[]> {
        return this.employeeModel.findAll();
    }

    async getOneEmployee(id: number): Promise<Employee> {
        if (id <= 0) {
            throw new BadRequestException('El ID no es válido');
        }

        const employee = await this.employeeModel.findOne({
            where: {
                id: id
            }
        });

        if (!employee) {
            throw new NotFoundException('Cita no encontrada');
        }

        return employee;
    }

    async createEmployee(dto: CreateEmployeeDto): Promise<Employee> {
        try {
            return this.employeeModel.create(dto);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateEmployee(id: number, dto: UpdatedEmployeeDto) {
        if (id <= 0) {
            throw new BadRequestException('El ID no es válido');
        }

        const employee = await this.employeeModel.findOne({
            where: {
                id: id
            }
        });

        if (!employee) {
            throw new NotFoundException('Empleado no encontrado');
        }

        await employee.update(dto);
        return 'Empleado actualizado correctamente';
    }

    async deleteEmployee(id: number) {
        if (id <= 0) {
            throw new BadRequestException('El ID no es válido');
        }

        const employee = await this.employeeModel.findOne({
            where: {
                id: id
            }
        });

        if (!employee) {
            throw new NotFoundException('Empleado no encontrado');
        }

        await employee.destroy();
        return 'Empleado eliminado correctamente';
    }


}
