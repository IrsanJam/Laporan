import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketingModule } from './marketing/marketing.module';
import { PenjualanModule } from './penjualan/penjualan.module';
import { PembayaranModule } from './pembayaran/pembayaran.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmsetModule } from './omset/omset.module';
import { Marketing } from './marketing/marketing.entity';
import { Omset } from './omset/omset.entity';
import { Pembayaran } from './pembayaran/pembayaran.entity';
import { Penjualan } from './penjualan/penjualan.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'yourpassword',
    database: 'laporan',
    entities: [Marketing, Penjualan, Pembayaran, Omset],
    synchronize: true
  }), MarketingModule, PenjualanModule,  PembayaranModule, OmsetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
