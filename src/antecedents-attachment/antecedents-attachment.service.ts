import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AntecedentAttachment } from './antecedentAttachment.entity';
import { CreateAntecedentAttachmentDto, UpdateAntecedentAttachmentDto } from './antecedents-attachment.dto';

@Injectable()
export class AntecedentAttachmentsService {
  constructor(
    @InjectModel(AntecedentAttachment)
    private attachmentModel: typeof AntecedentAttachment
  ) {}

  async getAllAttachments(): Promise<AntecedentAttachment[]> {
    return this.attachmentModel.findAll();
  }

  async getAttachmentsByAntecedent(antecedentId: number): Promise<AntecedentAttachment[]> {
    return this.attachmentModel.findAll({ where: { antecedentId } });
  }

  async getAttachmentById(id: number): Promise<AntecedentAttachment> {
    const attachment = await this.attachmentModel.findOne({ where: { id } });
    if (!attachment) {
      throw new NotFoundException('Adjunto no encontrado');
    }
    return attachment;
  }

  async createAttachment(dto: CreateAntecedentAttachmentDto): Promise<AntecedentAttachment> {
    return this.attachmentModel.create(dto);
  }

  async updateAttachment(id: number, dto: UpdateAntecedentAttachmentDto): Promise<AntecedentAttachment> {
    const attachment = await this.getAttachmentById(id);
    await attachment.update(dto);
    return attachment;
  }

  async deleteAttachment(id: number): Promise<{ message: string }> {
    const attachment = await this.getAttachmentById(id);
    await attachment.destroy();
    return { message: 'Adjunto eliminado correctamente' };
  }
}
