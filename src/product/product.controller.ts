import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdatedProductDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
    constructor(private productService: ProductService){}
    @Get('getProducts')
    getProducts(){
        return this.productService.getProducts();
    }

    @Get('getProductById/:id')
    getProductById(@Param('id') id:number){
        return this.productService.getOneProduct(id);
    }

    @Post('createProduct')
    createProduct(@Body() newProduct:CreateProductDto){
        return this.productService.createProduct(newProduct);
    }

    @Put('updateProduct/:id')
    updateProduct(@Param('id') id:number, @Body() updatedProduct:UpdatedProductDto){
        return this.productService.updateProduct(updatedProduct, id);
    }

    @Delete('deleteProduct/:id')
    deleteProduct(@Param('id') id:number){
        return this.productService.deleteProduct(id);
    }

    @Patch('patchProduct/:id')
    patchDue(@Param('id') id: number, @Body() dto: Partial<UpdatedProductDto>) {
        return this.productService.patchProduct(id, dto);
    }
}
