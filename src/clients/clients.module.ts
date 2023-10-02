import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsService], 
  controllers: [ClientsController],
})
export class ClientsModule {}

