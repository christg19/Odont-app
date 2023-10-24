import { Injectable } from '@nestjs/common';
import { CreateSupplierDto, UpdatedSupplierDto } from './dto';
import { Supplier } from './supplier.entity';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class SupplierService {
    constructor(@InjectModel(Supplier) private supplierModel: typeof Supplier) { }

    async getAllSuppliers(page:number, limit:number): Promise<{items: Supplier[], total:number}> {
        const offset = (page-1)*limit;
        const supplier = await this.supplierModel.findAndCountAll({
            limit:limit,
            offset:offset
        });

        return {
            items: supplier.rows,
            total: supplier.count,
        };
    }

    getOneSupplier(id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido')
        }
    }

    createSupplier(newSupplier: CreateSupplierDto) {

    }

    updateSupplier(updateSupplier: UpdatedSupplierDto, id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido')
        }
    }

    deleteSupplier(id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido')
        }
    }

}
