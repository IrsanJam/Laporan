import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { CreatePenjualanDto } from './dtos/create-penjualan';
import { UpdatePenjualanDto } from './dtos/update-penjualan';

@Controller('penjualan')
export class PenjualanController {
    constructor(private penjualanService:PenjualanService){}
     
    @Get()
    findAllPenjualan() {
        return this.penjualanService.findAll();
    }

    @Get(':id')
    findOnePenjualan(@Param('id') id:number) {
        return this.penjualanService.findOne(id);
    }

    @Post()
    createPenjualan(@Body() penjualanData:CreatePenjualanDto) {
        return this.penjualanService.create(penjualanData);
    }

    @Patch(':id')
    updatePenjualan(@Param('id') id:number, @Body() penjualanData:UpdatePenjualanDto) {
        return this.penjualanService.update(id, penjualanData);
    }

    @Delete(':id')
    removePenjualan(@Param('id') id:number) {
        return this.penjualanService.remove(id);
    }
}
