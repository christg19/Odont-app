import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Supplier } from './supplier.entity';
import { Product } from 'src/product/product.entity';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
  imports: [SequelizeModule.forFeature([Supplier, Product])],
  providers: [SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
