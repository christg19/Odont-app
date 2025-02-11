import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tooth, ToothStatus } from './tooth.entity';
import { CreateToothDto, UpdateServiceIdsDto, UpdateToothDto } from './dto';
import { Procedure } from 'src/procedure/procedure.entity';
import { Odontogram } from 'src/odontogram/odontogram.entity';
import { Service } from 'src/service/service.entity';

const logger = new Logger('NombreDelServicio');


@Injectable()
export class ToothService {
  constructor(@InjectModel(Tooth) private toothModel: typeof Tooth,
    @InjectModel(Odontogram) private odontogramModel: typeof Odontogram,
    @InjectModel(Procedure) private procedureModel: typeof Procedure) { }

  async getTeeth(): Promise<Tooth[]> {
    return this.toothModel.findAll();
  }

  async getTeethById(id: number): Promise<Tooth[]> {
    try {
      const odontogram: Odontogram = await this.odontogramModel.findOne({
        where: {
          id: id
        },
        include: [Tooth]
      });

      if (!odontogram) {
        throw new NotFoundException('No se encontró el odontograma');
      }

      return odontogram.tooth;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTooth(id: number): Promise<Tooth> {
    try {
      if (id < 1) {
        throw new Error('El ID no es válido');
      }

      const tooth = await this.toothModel.findOne({
        where: {
          id: id
        }
      });

      if (!tooth) {
        throw new NotFoundException('Este diente no existe');
      }

      return tooth;

    } catch (error) {
      throw new Error(error);
    }
  }

  async createTooth(dto: CreateToothDto): Promise<Tooth> {
    try {
      const odontogram = await this.odontogramModel.findOne({
        where: { id: dto.odontogramId },
      });

      if (!odontogram) {
        throw new NotFoundException('El odontograma no existe');
      }

      if (dto.toothPosition > 32) {
        throw new Error('El diente debe tener una posición válida');
      }

      const tooth = await this.toothModel.create({
        toothPosition: dto.toothPosition,
        toothName: dto.toothPosition,
        status: dto.status || 5,
        odontogramId: odontogram.id,
        serviceIds: dto.serviceIds
      });

      return tooth;

    } catch (error) {
      logger.error(`Error al crear el diente: ${error.message}`);
      throw new Error(`Error al crear el diente: ${error.message}`);
    }
  }




  async updateTooth(id: number, dto: UpdateToothDto): Promise<Tooth> {
    try {
      const odontogram = await this.odontogramModel.findOne({
        where: { id: dto.odontogramId }
      });
      if (!odontogram) {
        throw new NotFoundException('No existe el odontograma');
      }
      const tooth = await this.toothModel.findOne({
        where: { id: id, odontogramId: dto.odontogramId }
      });
      if (!tooth) {
        throw new NotFoundException('No existe este diente');
      }
      await tooth.update({
        toothPosition: dto.toothPosition,
        status: dto.status,
        serviceIds: dto.serviceIds
      });
      await tooth.reload();
      return tooth;  // Retornamos el diente actualizado
    } catch (error) {
      throw error;
    }
  }
// tooth.service.ts
async updateToothStatus(toothId: number, odontogramId: number, newStatus: number): Promise<Tooth> {
  const tooth = await this.toothModel.findOne({
    where: { id: toothId, odontogramId: odontogramId }
  });

  if (!tooth) {
    throw new NotFoundException('No existe este diente en el odontograma especificado.');
  }

  console.log(`Actualizando diente ${toothId}: status actual ${tooth.status}, nuevo status ${newStatus}`);

  // Validar si el nuevo status es válido dentro del enum
  if (!Object.values(ToothStatus).includes(newStatus)) {
    throw new BadRequestException(`Estado inválido: ${newStatus}`);
  }

  // Iniciar transacción
  const transaction = await this.toothModel.sequelize.transaction();
  try {
    await tooth.update({ status: newStatus }, { transaction, silent: false });
    await transaction.commit();
    await tooth.reload();
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al actualizar el diente: ${error.message}`);
  }

  console.log('Diente actualizado:', tooth.toJSON());
  return tooth;
}

async updateToothServiceIds(id: number, dto: UpdateServiceIdsDto): Promise<Tooth> {
  // Verifica que el odontograma existe
  const odontogram = await this.odontogramModel.findOne({
    where: { id: dto.odontogramId }
  });
  if (!odontogram) {
    throw new NotFoundException('No existe el odontograma');
  }
  // Buscar el diente usando el id y el odontogramId
  const tooth = await this.toothModel.findOne({
    where: { id: id, odontogramId: dto.odontogramId }
  });
  if (!tooth) {
    throw new NotFoundException('No existe este diente');
  }
  // Actualizar únicamente la propiedad serviceIds
  await tooth.update({
    serviceIds: dto.serviceIds
  });
  await tooth.reload();
  return tooth;
}
  
  async deleteTooth(id: number) {

  }
}
