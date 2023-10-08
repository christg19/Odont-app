import { Body, Controller, Post, Put, Delete, Get, Param } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto, UpdatedSupplierDto } from './dto';


@Controller('supplier')
export class SupplierController {
    constructor(private supplierService:SupplierService){}

    @Get()
    getSuppliers(){
        return this.supplierService.getAllSuppliers();
    }

    @Get(':id')
    getSupplierById(@Param('id') id:number){
        return this.supplierService.getOneSupplier(id);
    }

    @Post()
    createSupplier(@Body() newSupplier:CreateSupplierDto){
        return this.supplierService.createSupplier(newSupplier);
    }

    @Put(':id')
    updateSupplier(@Param('id') id:number, @Body() updatedSupplier:UpdatedSupplierDto){
        return this.supplierService.updateSupplier(updatedSupplier, id);
    }

    @Delete(':id')
    deleteSupplier(@Param('id') id:number){
        return this.supplierService.deleteSupplier(id);
    }
}
