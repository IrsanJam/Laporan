import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OmsetDto {
    @ApiProperty({example: 'Marketing A', description: 'Nama Marketing'})
    @IsString()
    marketing: string;

    @ApiProperty({example: 'January', description: 'Bulan'})
    @IsString()
    bulan: string;

    @ApiProperty({example: '1000000000', description: 'Omzet'})
    @IsNumber()
    omzet: number;

    @ApiProperty({example: '10%', description: 'Komisi Persentase'})
    @IsNumber()
    komisi: number;

    @ApiProperty({example: '1000000', description: 'Komisi Nominal'})
    @IsNumber()
    komisi_nominal: number;
}