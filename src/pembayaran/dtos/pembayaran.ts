// src/pembayaran/dto/pembayaran.dto.ts
import { Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PembayaranDto {
  @ApiProperty({ example: '1', description: 'ID Penjualan' })
  @IsNumber()
  penjualanId: number;

  @ApiProperty({ example: '1000', description: 'Jumlah pembayaran' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2022-01-01', description: 'Tanggal pembayaran' })
  @IsDate()
  @Type(() => Date)
  paymentDate: Date;
}
