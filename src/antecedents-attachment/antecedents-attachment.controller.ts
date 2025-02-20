import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AntecedentAttachmentsService } from './antecedents-attachment.service';
import { CreateAntecedentAttachmentDto, UpdateAntecedentAttachmentDto } from './antecedents-attachment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFile } from 'fs/promises';

@ApiTags('antecedent-attachments')
@Controller('antecedent-attachments')
export class AntecedentAttachmentsController {
  constructor(private readonly attachmentsService: AntecedentAttachmentsService) {}

  @Get()
  async getAll() {
    return this.attachmentsService.getAllAttachments();
  }

  @Get('antecedent/:antecedentId')
  async getByAntecedent(@Param('antecedentId') antecedentId: number) {
    return this.attachmentsService.getAttachmentsByAntecedent(antecedentId);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.attachmentsService.getAttachmentById(id);
  }

  @Post()
  async create(@Body() dto: CreateAntecedentAttachmentDto) {
    return this.attachmentsService.createAttachment(dto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body('antecedentId') antecedentId: number,
  ) {
    // Construir la URL pública del archivo; asegúrate de que 'uploads' es la carpeta expuesta.
    const fileUrl = `http://localhost:3000/uploads/${file.filename}`;

    const attachmentDto: CreateAntecedentAttachmentDto = {
      fileName: file.originalname,
      filePath: fileUrl, // Aquí se guarda la URL completa
      fileType: file.mimetype,
      size: file.size,
      antecedentId: Number(antecedentId),
    };

    const createdAttachment = await this.attachmentsService.createAttachment(attachmentDto);
    return createdAttachment;
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAntecedentAttachmentDto) {
    return this.attachmentsService.updateAttachment(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.attachmentsService.deleteAttachment(id);
  }
}
