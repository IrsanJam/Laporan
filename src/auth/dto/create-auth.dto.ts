import {IsNumber, IsString} from "class-validator";

export class CreateAuthDto {

    @IsNumber()
    id: number;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    email: string;

}
