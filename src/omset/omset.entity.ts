import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Omset {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    marketing: string

    
    @Column()
    bulan: string

    
    @Column()
    omzet: number

    
    @Column()
    komisi: string

    @Column()
    komisi_nominal: number
}