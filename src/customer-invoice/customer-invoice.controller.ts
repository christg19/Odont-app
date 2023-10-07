import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateCustomerInvoiceDto } from './dto';
import { CustomerInvoiceService } from './customer-invoice.service';

@Controller('customer-invoice')
export class customerInvoiceController {
    constructor(private customerInvoiceService:CustomerInvoiceService){}

    @Get()
    getCustomerInvoices(){
        return this.customerInvoiceService.getCustomerInvoices()
    }

    @Get(':id')
    getCustomerInvoiceById(@Param('id') id:number ){
        return this.customerInvoiceService.getCustomerInvoiceById(id)
    }

    @Post()
    createCustomerInvoice(@Body() dto: CreateCustomerInvoiceDto ){
        return this.customerInvoiceService.createCustomerInvoice(dto)
    }


}
