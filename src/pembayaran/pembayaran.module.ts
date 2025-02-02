import { Module } from '@nestjs/common';
import { PembayaranService } from './pembayaran.service';
import { PembayaranController } from './pembayaran.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pembayaran } from './pembayaran.entity';
import { PenjualanModule } from 'src/penjualan/penjualan.module';

@Module({
  imports:[TypeOrmModule.forFeature([Pembayaran]), PenjualanModule],
  providers: [PembayaranService],
  controllers: [PembayaranController]
})
export class PembayaranModule {}
