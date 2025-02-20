import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { CreateProductDto, UpdatedProductDto } from './dto';
import { CategoryProduct } from 'src/category-product/category-product.entity';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(@InjectModel(Product) private productModel: typeof Product,
        @InjectModel(CategoryProduct) private categoryProductModel: typeof CategoryProduct) { }

        async getProducts(): Promise<Product[]> {
            const products = await this.productModel.findAll();
            return products;
        }
        

        async getOneProduct(id: number): Promise<Product> {
            if (id <= 0) {
              throw new Error('El ID no es válido');
            }
            const product = await this.productModel.findOne({
              where: { id }
            });
            if (!product) {
              throw new NotFoundException('Producto no encontrado');
            }
            return product;
          }
          

    async createProduct(newProduct: CreateProductDto): Promise<Product> {
        try {
          const product: Product = await this.productModel.create({
            name: newProduct.name,
            unitDate: newProduct.unitDate,
            notes: newProduct.notes,
            expiryDate: newProduct.expiryDate,
            categoryProduct: newProduct.categoryProduct,
            instrumentalState: newProduct.instrumentalState,
            // Si el DTO no las incluye, puedes asignar valores por defecto:
            used: newProduct.used ?? false,
            quantity: newProduct.quantity ?? 0,
          });
      
          return product;
        } catch (error) {
          throw new Error(error);
        }
      }
      

      async updateProduct(dto: UpdatedProductDto, id: number) {
        if (id <= 0) {
          throw new Error('El ID no es válido');
        }
      
        const product = await this.productModel.findOne({
          where: { id: id }
        });
      
        if (!product) {
          throw new Error('Producto no encontrado');
        }
      
        // Actualizamos incluyendo las nuevas propiedades
        await product.update({
          name: dto.name,
          unitDate: dto.unitDate,
          notes: dto.notes,
          expiryDate: dto.expiryDate,
          categoryProduct: dto.categoryProduct,
          instrumentalState: dto.instrumentalState,
          used: dto.used,
          quantity: dto.quantity,
        });
      }

    async deleteProduct(id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        };
        const product = await this.productModel.findOne({
            where: {
                id: id
            }
        });
        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        await product.destroy();

    }

    async patchProduct(id: number, dto: Partial<UpdatedProductDto>) {
        const product = await this.productModel.findByPk(id);
        if (!product) {
            throw new NotFoundException('Product no encontrado');
        }
    
        await product.update(dto);
    }

    async markInstrumentAsNotSterile(productId: number): Promise<Product> {
        this.logger.log(`Marcando instrumento ${productId} como no esterilizado`);
        const product = await this.productModel.findByPk(productId);
        if (!product) {
          throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }
        return product.update({ instrumentalState: false });
      }
      
    
      async markDisposableAsUsed(productId: number): Promise<Product> {
        const product = await this.productModel.findByPk(productId);
        if (!product) {
          throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }
        return product.update({ instrumentalState: false });
      }
    
      async reduceChemicalQuantity(productId: number, amount: number): Promise<Product> {
        const product = await this.productModel.findByPk(productId);
        if (!product) {
          throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }
        const newQuantity = (product.quantity || 0) - amount;
        return product.update({ quantity: newQuantity });
      }
    
 
}
