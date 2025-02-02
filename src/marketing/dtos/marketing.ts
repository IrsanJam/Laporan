import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MarketingDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Marketing A', description: 'Nama Marketing'})
    name: string;
}