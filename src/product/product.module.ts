import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryProduct } from 'src/category-product/category-product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, CategoryProduct])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService], 
})
export class ProductModule {}

