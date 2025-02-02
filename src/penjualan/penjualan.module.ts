import { Module } from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { PenjualanController } from './penjualan.controller';
import { Penjualan } from './penjualan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Penjualan])],
  exports:[TypeOrmModule],
  providers: [PenjualanService],
  controllers: [PenjualanController]
})
export class PenjualanModule {}
