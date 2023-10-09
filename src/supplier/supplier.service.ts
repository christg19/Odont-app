import { Injectable } from '@nestjs/common';
import { CreateSupplierDto, UpdatedSupplierDto } from './dto';

@Injectable()
export class SupplierService {
    constructor() { }

    getAllSuppliers() {

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
