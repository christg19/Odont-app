import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdatedProductDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
    constructor(private productService: ProductService){}
    @Get('all')
    getProducts(){
        return this.productService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id:number){
        return this.productService.getOneProduct(id);
    }

    @Post('')
    createProduct(@Body() newProduct:CreateProductDto){
        return this.productService.createProduct(newProduct);
    }

    @Put(':id')
    updateProduct(@Param('id') id:number, @Body() updatedProduct:UpdatedProductDto){
        return this.productService.updateProduct(updatedProduct, id);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id:number){
        return this.productService.deleteProduct(id);
    }

    @Patch(':id')
    patchDue(@Param('id') id: number, @Body() dto: Partial<UpdatedProductDto>) {
        return this.productService.patchProduct(id, dto);
    }
}
