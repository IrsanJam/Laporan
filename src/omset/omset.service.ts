import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Omset } from './omset.entity';
import { Penjualan } from 'src/penjualan/penjualan.entity';
import { Marketing } from 'src/marketing/marketing.entity';

@Injectable()
export class OmsetService {
    constructor(
        @InjectRepository(Marketing) private MarketingRepository: Repository<Marketing>,
        @InjectRepository(Penjualan) private PenjualanRepository: Repository<Penjualan>,
        @InjectRepository(Omset) private OmsetRepository: Repository<Omset>,
    ) {}

    async findAll() {
        const data = await this.MarketingRepository.createQueryBuilder('marketing')
            .leftJoinAndSelect('marketing.penjualans', 'penjualan')
            .getMany();

        const omsetMap = new Map<string, { marketing: string; bulan: string; omzet: number; komisiPersentase: number }>();

        data.forEach((marketing) => {
            marketing.penjualans.forEach((penjualan) => {
                const bulan = new Date(penjualan.date).toLocaleString('id-ID', { month: 'long' });
                const omzet = Number(penjualan.total_balance);
                const key = `${marketing.name}-${bulan}`;

                let komisiPersentase: number = 0;
                if (omsetMap.has(key)) {
                    const existing = omsetMap.get(key)!;
                    existing.omzet += omzet; // Tambahkan omzet jika data sudah ada
                } else {
                    omsetMap.set(key, { marketing: marketing.name, bulan, omzet, komisiPersentase });
                }
            });
        });

        const omsets = Array.from(omsetMap.values()).map(({ marketing, bulan, omzet }) => {
            let komisiPersentase = 0;
            if (omzet > 500_000_000) {
                komisiPersentase = 0.1;
            } else if (omzet > 200_000_000) {
                komisiPersentase = 0.05;
            } else if (omzet > 100_000_000) {
                komisiPersentase = 0.025;
            }

            return {
                marketing,
                bulan,
                omzet,
                komisi: `${komisiPersentase * 100}%`,
                komisi_nominal: omzet * komisiPersentase + omzet,
            };
        });

        for (const omset of omsets) {
            const existingOmset = await this.OmsetRepository.findOne({
                where: { marketing: omset.marketing, bulan: omset.bulan },
            });

            if (existingOmset) {
                existingOmset.omzet = omset.omzet;
                existingOmset.komisi = omset.komisi;
                await this.OmsetRepository.save(existingOmset);
            } else {
                const newOmset = this.OmsetRepository.create({
                    marketing: omset.marketing,
                    bulan: omset.bulan,
                    omzet: omset.omzet,
                    komisi: omset.komisi,
                    komisi_nominal: omset.komisi_nominal,
                });
                await this.OmsetRepository.save(newOmset);
            }
        }

        return omsets;
    }
}
