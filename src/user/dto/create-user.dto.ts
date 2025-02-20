import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @Expose()
  id: string;

  @Expose()
  @IsString()
  username: string;

  @IsString()
  password: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  about: string;

  @Expose()
  image: string;

  @Expose()
  friends: string[];

  @Expose()
  blocked: string[];

  @Expose()
  request: string[];
}
