import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CreateCategoryDto, UpdatedCategoryDto } from './dto';

@Controller('category-product')
export class CategoryProductController {
    constructor(private categoryProductService: CategoryProductService) { }

    @Get('getAllCategories/:page/:limit')
    getAllCategories(@Param('page') page:number, @Param('limit') limit:number) {
        return this.categoryProductService.getCategories(page, limit)
    }

    @Get('getCategory/:id')
    getCategory(@Param('id') id: number) {
        return this.categoryProductService.getCategory(id)
    }

    @Post('createCategory')
    createCategory(@Body() newCategory: CreateCategoryDto) {
        return this.categoryProductService.createCategory(newCategory)
    }

    @Put('updateCategory/:id')
    updateCategory(@Param('id') id: number, @Body() updatedCategory: UpdatedCategoryDto) {
        return this.categoryProductService.updateCategory(id, updatedCategory)
    }

    @Delete('deleteCategory/:id')
    deleteCategory(@Param('id') id: number) {
        return this.categoryProductService.deleteCategory(id)
    }
}
