// src/pembayaran/pembayaran.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PembayaranService } from './pembayaran.service';
import { PembayaranDto } from './dtos/pembayaran';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Pembayaran')
@Controller('pembayaran')
export class PembayaranController {
  constructor(private readonly pembayaranService: PembayaranService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pembayaran' })
  @ApiResponse({ description: 'The pembayaran has been successfully created.' })
  create(@Body() pembayaranDto: PembayaranDto) {
    return this.pembayaranService.create(pembayaranDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pembayaran' })
  @ApiResponse({ description: 'Returns an array of pembayaran' })
  findAll() {
    return this.pembayaranService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pembayaran by id' })
  @ApiResponse({ description: 'Returns a pembayaran' })
  findOne(@Param('id') id: string) {
    return this.pembayaranService.findOne(+id);
  }
}
