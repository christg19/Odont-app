import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateCustomerInvoiceDto } from './dto';
import { CustomerInvoiceService } from './customer-invoice.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('customer-invoice')
@ApiTags('customer-invoice')
export class customerInvoiceController {
    constructor(private customerInvoiceService:CustomerInvoiceService){}

    @Get('getCustomerInvoices')
    getCustomerInvoices(@Param('page') page:number, @Param('limit') limit:number){
        return this.customerInvoiceService.getCustomerInvoices(page, limit)
    }

    @Get('getCustomerInvoiceById/:id')
    getCustomerInvoiceById(@Param('id') id:number ){
        return this.customerInvoiceService.getCustomerInvoiceById(id)
    }

    @Post('createCustomerInvoice')
    createCustomerInvoice(@Body() dto: CreateCustomerInvoiceDto ){
        return this.customerInvoiceService.createCustomerInvoice(dto)
    }


}
