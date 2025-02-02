import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Penjualan } from './penjualan.entity';
import { HttpException } from '@nestjs/common';
import { CreatePenjualanDto } from './dtos/create-penjualan';
import { UpdatePenjualanDto } from './dtos/update-penjualan';

@Injectable()
export class PenjualanService {
    constructor(@InjectRepository(Penjualan) private PenjualanRepository:Repository<Penjualan> ) {}


    async generateTransactionNumber(): Promise<string> {
        const lastTransaction = await this.PenjualanRepository
            .createQueryBuilder('penjualan')
            .orderBy('penjualan.id', 'DESC')
            .getOne();

        let nextNumber = 1;
        if (lastTransaction) {
            const lastNumber = parseInt(lastTransaction.transaction_number.replace('TRX', ''), 10);
            nextNumber = lastNumber + 1;
        }
        return `TRX${String(nextNumber).padStart(3, '0')}`;  // Contoh: TRX001, TRX002
    }

    async findAll() {
        const penjualan = await this.PenjualanRepository.find();
        if (penjualan.length === 0) {
            throw new HttpException('Penjualan data not found', 404);
        }
        return penjualan;
    }

    async findOne(id: number) {
        const penjualan = await this.PenjualanRepository.findOneBy({ id });
        if (!penjualan) {
            throw new HttpException('Penjualan not found', 404);
        }
        return penjualan;
    }
    async create(@Body() penjualanData: CreatePenjualanDto) {
        const transaction_number = await this.generateTransactionNumber();
        const grand_total = penjualanData.total_balance + penjualanData.cargo_fee; // Hitung grand total

        const penjualan = this.PenjualanRepository.create({
            ...penjualanData,
            transaction_number,
            grand_total, // Simpan grand_total
        });
        return await this.PenjualanRepository.save(penjualan);
    }

    async update(id: number, @Body() penjualanData: UpdatePenjualanDto) {
        const penjualan = await this.PenjualanRepository.findOneBy({ id });
        if (penjualan) {
            Object.assign(penjualan, penjualanData);

            // Hitung ulang grand_total jika total_balance atau cargo_fee diupdate
            penjualan.grand_total = (penjualan.total_balance || 0) + (penjualan.cargo_fee || 0);

            return this.PenjualanRepository.save(penjualan);
        } else {
            throw new HttpException('ID Penjualan not found', 404);
        }
    }

    async remove(id: number) {
        const penjualan = await this.PenjualanRepository.findOneBy({ id });
        if (penjualan) {
            await this.PenjualanRepository.remove(penjualan);
            return {
                message: 'Deleted Successfully',
                status: 200,
            };
        } else {
            throw new HttpException('ID Penjualan not found', 404);
        }
    }
}
