import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Unique } from "typeorm";

export class UpdatePenjualanDto {
    
    @IsString()
    transaction_number: string

    
    @IsNumber()
    marketing_id: number

    
    @IsDate()
    date: Date


    @IsNumber()
    cargo_fee: number

    
    @IsNumber()
    total_balance: number

    @IsOptional()
    @IsNumber()
    grand_total: number

    
    @IsString()
    metode_pembayaran: string
}