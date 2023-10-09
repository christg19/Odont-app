import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryProduct } from './category-product.entity';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([CategoryProduct, Product])],
  providers: [CategoryProductService],
  controllers: [CategoryProductController],
})

export class CategoryProductModule {}
