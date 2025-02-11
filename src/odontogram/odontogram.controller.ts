import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OdontogramService } from './odontogram.service';
import { CreateOdontogramDto, UpdateOdontogramDto } from './dto';

@Controller('odontogram')
@ApiTags('odontogram')
export class OdontogramController {
    constructor( private odontogramService: OdontogramService) { }

    @Get('all')
    getOdontograms( ) {
        return this.odontogramService.getOdontograms();
    }

    @Get(':id')
    getOdontogram(@Param('id') id: number) {
        return this.odontogramService.getOdontogram(id);
    }

    @Post('')
    createOdontogram(@Body() newOdontogram: CreateOdontogramDto) {
        return this.odontogramService.createOdontogram(newOdontogram)
    }

    @Put(':id')
    updateOdontogram(@Param('id') id: number, @Body() updateOdontogram: UpdateOdontogramDto) {
        return this.odontogramService.updateOdontogram(id, updateOdontogram)
    }

    @Delete(':id')
    deleteOdontogram(@Param('id') id: number) {
        return this.odontogramService.deleteOdontogram(id)
    }
}
