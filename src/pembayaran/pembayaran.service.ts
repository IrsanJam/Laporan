// src/pembayaran/pembayaran.service.ts
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pembayaran } from './pembayaran.entity';
import { PembayaranDto } from './dtos/pembayaran';
import { Penjualan } from '../penjualan/penjualan.entity';

@Injectable()
export class PembayaranService {
  constructor(
    @InjectRepository(Pembayaran)
    private pembayaranRepository: Repository<Pembayaran>,
    @InjectRepository(Penjualan)
    private penjualanRepository: Repository<Penjualan>,
  ) {}

  async create(pembayaranDto: PembayaranDto): Promise<Pembayaran> {
    const penjualan = await this.penjualanRepository.findOne({ where: { id: pembayaranDto.penjualanId } });

    if (!penjualan) {
      throw new BadRequestException('Penjualan tidak ditemukan');
    }

    const pembayaranSebelumnya = await this.pembayaranRepository.find({ where: { penjualanId: penjualan.id } });
    const totalDibayar = pembayaranSebelumnya.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const sisaSaldo = Number(penjualan.grand_total) - totalDibayar;

    if (pembayaranDto.amount > sisaSaldo) {
      throw new BadRequestException('Jumlah pembayaran melebihi sisa saldo');
    }

    if (isNaN(new Date(pembayaranDto.paymentDate).getTime())) {
      throw new BadRequestException('Tanggal pembayaran tidak valid');
    }

    const pembayaran = this.pembayaranRepository.create({
      ...pembayaranDto,
      remainingBalance: sisaSaldo - pembayaranDto.amount,
      isPaid: sisaSaldo - pembayaranDto.amount === 0,
    });

    return this.pembayaranRepository.save(pembayaran);
  }

  findAll(): Promise<Pembayaran[]> {
    return this.pembayaranRepository.find({ relations: ['penjualan'] });
  }

  async findOne(id: number) {
    const pembayaran = await this.pembayaranRepository.findOne({ where: { id }, relations: ['penjualan'] });
     if (!pembayaran) {
          throw new HttpException('ID Pembayaran not found', 404);
        }
    return pembayaran;
  }
}
