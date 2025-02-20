import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { AntecedentAttachment } from './antecedentAttachment.entity';
import { AntecedentAttachmentsController } from './antecedents-attachment.controller';
import { AntecedentAttachmentsService } from './antecedents-attachment.service';

@Module({
  imports: [
    SequelizeModule.forFeature([AntecedentAttachment]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  ],
  controllers: [AntecedentAttachmentsController],
  providers: [AntecedentAttachmentsService],
  exports: [AntecedentAttachmentsService],
})
export class AntecedentAttachmentsModule {}
