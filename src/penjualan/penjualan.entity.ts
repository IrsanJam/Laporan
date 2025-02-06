import { Column, ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Marketing } from "../marketing/marketing.entity";
@Entity()
export class Penjualan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, update: false })
    transaction_number: string;
    
    @Column()
    marketing_id: number;

    @ManyToOne(() => Marketing, (marketing) => marketing.penjualans)
    @JoinColumn({ name: 'marketing_id' })
    marketing: Marketing;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'decimal', default: 0 })
    cargo_fee: number;

    @Column({ type: 'decimal', default: 0 })
    total_balance: number;

    @Column({ type: 'decimal', default: 0 })
    grand_total: number;

    @Column()
    metode_pembayaran: string;
}
