import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { CreateProductDto, UpdatedProductDto } from './dto';
import { CategoryProduct } from 'src/category-product/category-product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productModel: typeof Product,
    @InjectModel(CategoryProduct) private categoryProductModel: typeof CategoryProduct){}

    async getProducts(page:number, limit:number): Promise<{items: Product[], total:number}>{
        const offset = (page-1)*limit;
        const product = await this.productModel.findAndCountAll({
            limit:limit,
            offset:offset
        });

        return {
            items: product.rows,
            total: product.count,
        }
    }

    async getOneProduct(id:number): Promise<Product>{
        if(id <= 0){
            throw new Error('El ID no es válido');
        };

        const product = this.productModel.findOne({
            where: {
                id:id
            }
        });

        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }

        return product;
    }

   async createProduct(newProduct:CreateProductDto){
        if(newProduct.categoryProductId <= 0){
            throw new Error ('El ID no es válido');
        };

        const categoryProduct:CategoryProduct = await this.categoryProductModel.findOne({
            where: {
                id: newProduct.categoryProductId
            }
        })

        try {
            const product: Product = await this.productModel.create({
                proveedorId:newProduct.proveedorId,
                name:newProduct.name,
                costToBuy:newProduct.costToBuy,
                priceToSell:newProduct.priceToSell,
                units:newProduct.units,
                categoryProduct: categoryProduct
            });
            
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

   async updateProduct(dto:UpdatedProductDto, id:number){
        if(id <= 0){
            throw new Error('El ID no es válido');
        };

        const product = await this.productModel.findOne({
            where:{
                id:id
            }
        });

        if(!product){
            throw new Error('Producto no encontrado');
        };

        await product.update(dto);
        return 'El producto fue actualizado';
    }

    async deleteProduct(id:number){
        if(id <= 0){
            throw new Error('El ID no es válido');
        };
        const product = await this.productModel.findOne({
            where:{
                id:id
            }
        });
        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }

        await product.destroy();
        return 'Producto eliminado correctamente';
    }
}
