import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Penjualan } from "../penjualan/penjualan.entity";
@Entity()
export class Marketing {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Penjualan, (penjualan) => penjualan.marketing)
    penjualans: Penjualan[];
}