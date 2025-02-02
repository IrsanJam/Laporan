import { Column, ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Penjualan } from "src/penjualan/penjualan.entity";

@Entity()
export class Pembayaran {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  penjualanId: number;

  @ManyToOne(() => Penjualan)
  @JoinColumn({ name: 'penjualanId' })
  penjualan: Penjualan;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column('date', {nullable: true})
  paymentDate: Date;

  @Column({ default: false })
  isPaid: boolean;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  remainingBalance: number;
}