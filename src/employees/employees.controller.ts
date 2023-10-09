import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdatedEmployeeDto } from './dto';

@Controller('employees')
export class EmployeesController {
    constructor(private employeeService:EmployeesService){}
    
    @Get('getAllEmployees')
    getAllEmployees(){
        return this.employeeService.getEmployees()
    }

    @Get('getEmployeeById/:id') 
    getEmployeeById(@Param('id') id:number){
        return this.employeeService.getOneEmployee(id)
    }

    @Post('createEmployee')
    createEmployee(@Body() newEmployee:CreateEmployeeDto){
        return this.employeeService.createEmployee(newEmployee)
    }

    @Put('updateEmployee/:id')
    updateEmployee(@Param('id') id:number, @Body() updatedEmployee:UpdatedEmployeeDto){
        return this.employeeService.updateEmployee(id, updatedEmployee)
    }

    @Delete('deleteEmployee/:id')
    deleteEmployee(@Param('id') id:number){
        return this.employeeService.deleteEmployee(id)
    }
    
}
