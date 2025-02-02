import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, IsOptional } from "class-validator";

export class CreatePenjualanDto {
    @IsOptional() 
    transaction_number: string;

    @IsNumber()
    marketing_id: number;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNumber()
    cargo_fee: number;

    @IsNumber()
    total_balance: number;

    @IsOptional()
    grand_total: number;

    @IsString()
    metode_pembayaran: string;
}
