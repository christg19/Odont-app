import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ToothService } from './tooth.service';
import { CreateToothDto, UpdateServiceIdsDto, UpdateToothDto, UpdateToothStatusDto } from './dto';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Tooth } from './tooth.entity';

@Controller('tooth')
@ApiTags('tooth')
export class ToothController {
    constructor(private toothService: ToothService) { }

    @Get('all')
    getTeeth() {
        return this.toothService.getTeeth();
    }

    @Get('all/:id')
    getTeethByOdontogramId(@Param('id') id: number) {
        return this.toothService.getTeethById(id)
    }

    @Get(':id')
    getTooth(@Param('id') id: number) {
        return this.toothService.getTooth(id);
    }

    @Post('')
    createTooth(@Body() dto: CreateToothDto) {
        return this.toothService.createTooth(dto);
    }

    @Put(':id')
    updateTooth(@Param('id') id: number, @Body() dto: UpdateToothDto) {
        return this.toothService.updateTooth(id, dto);
    }

    @Put(':id/status')
    async updateToothStatus(@Param('id') id: number, @Body() dto: UpdateToothStatusDto): Promise<Tooth> {
        return this.toothService.updateToothStatus(id, dto.odontogramId, dto.status);
    }

    @Put(':id/serviceIds')
    updateToothServiceIds(
        @Param('id') id: number,
        @Body() dto: UpdateServiceIdsDto
    ) {
        return this.toothService.updateToothServiceIds(id, dto);
    }

    @Delete(':id')
    deleteTooth(@Param('id') id: number) {
        return this.toothService.deleteTooth(id);
    }
}
