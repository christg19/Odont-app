import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Injectable()
export class ServiceService {
    
    constructor(@InjectModel(Service) private serviceModel: typeof Service){}

    async getAll(): Promise<Service[]>{
        return this.serviceModel.findAll();
    }

    async getOne(id:number): Promise<Service>{
        return this.serviceModel.findOne({
            where: {
                id:id
            }
        });
    }

    async create(dto:CreateServiceDto){
        return this.serviceModel.create(dto);
    }

    async update(dto:UpdateServiceDto, id:number){
        const service = await this.serviceModel.findOne({
            where:{
                id:id
            }
        });

        await service.update(dto);
    }

    async delete(id:number){
        const service = await this.serviceModel.findOne({
            where:{
                id:id
            }
        });

        service.destroy();
    }
}
