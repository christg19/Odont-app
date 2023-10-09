import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryProduct } from './category-product.entity';
import { CreateCategoryDto, UpdatedCategoryDto } from './dto';

@Injectable()
export class CategoryProductService {
    constructor(@InjectModel(CategoryProduct) private categoryProductModel: typeof CategoryProduct) { }

    async getCategories(): Promise<CategoryProduct[]> {
        return this.categoryProductModel.findAll();
    }

    async getCategory(id: number): Promise<CategoryProduct> {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        }

        const category: CategoryProduct = await this.categoryProductModel.findOne({
            where: {
                id: id
            }
        });

        if (!category) {
            throw new NotFoundException('Categoria no encontrada');
        } 

        return category;

    }

    async createCategory(dto: CreateCategoryDto) {
        try {
            const newCategory: CategoryProduct = await this.categoryProductModel.create(dto)
            return newCategory;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateCategory(id:number, dto:UpdatedCategoryDto){
        if(id <= 0){
            throw new Error('El ID no es válido');
        }

        const category:CategoryProduct = await this.categoryProductModel.findOne({
            where:{
                id:id
            }
        });

        if(!category){
            throw new Error('Categoria no encontrada');
        }

        await category.update(dto);
        return 'La categoria ha sido actualizada correctamente';
    }

    async deleteCategory(id:number){
        if(id <= 0){
            throw new Error('El ID no es válido');
        }

        const category:CategoryProduct = await this.categoryProductModel.findOne({
            where:{
                id:id
            }
        });
        
        if(!category){
            throw new Error('Categoria no encontrada');
        }

        await category.destroy();
        return 'La categoria se ha eliminado con exito';
    }
}
