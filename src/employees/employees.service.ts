import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdatedEmployeeDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmployeesService {

    constructor(@InjectModel(Employee) private employeeModel: typeof Employee) { }

    async getEmployees(page:number, limit:number): Promise<{items: Employee[], total: number}> {
        const offset = (page - 1) * limit;
        const employee = await this.employeeModel.findAndCountAll({
            limit:limit,
            offset:offset
        });

        return {
            items: employee.rows,
            total: employee.count,
        }
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
