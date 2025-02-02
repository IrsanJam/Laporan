import { Module } from '@nestjs/common';
import { OmsetController } from './omset.controller';
import { OmsetService } from './omset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Omset } from './omset.entity';
import { MarketingModule } from 'src/marketing/marketing.module';
import { PenjualanModule } from 'src/penjualan/penjualan.module';
import { MarketingService } from 'src/marketing/marketing.service';
import { PenjualanService } from 'src/penjualan/penjualan.service';

@Module({
  imports:[TypeOrmModule.forFeature([Omset]), MarketingModule, PenjualanModule],
  controllers: [OmsetController],
  providers: [OmsetService]
})
export class OmsetModule {}
