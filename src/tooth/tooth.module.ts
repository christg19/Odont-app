import { Module } from '@nestjs/common';
import { ToothService } from './tooth.service';

@Module({
  providers: [ToothService]
})
export class ToothModule {}
