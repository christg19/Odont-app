import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Injectable()
export class ServiceService {

    constructor(@InjectModel(Service) private serviceModel: typeof Service) { }

    async getAll(): Promise<Service[]> {
        return this.serviceModel.findAll();
    }

    async getOne(id: number): Promise<Service> {
      if(id <= 0){
        throw new Error('El ID no es válido');
      };
            return this.serviceModel.findOne({
                where: {
                    id: id
                }
            });
        
    }

    async create(dto: CreateServiceDto) {
        try {
            return this.serviceModel.create(dto);
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(dto: UpdateServiceDto, id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido')
        };

        const service = await this.serviceModel.findOne({
            where: {
                id: id
            }
        });

        await service.update(dto);
        return 'Servicio actualizado correctamente';
    }

    async delete(id: number) {
        if (id <= 0) {
            throw new Error('El ID no es válido');
        };

        const service = await this.serviceModel.findOne({
            where: {
                id: id
            }
        });

        await service.destroy();
        return 'El servicio fue eliminado correctamente'
    }
}
