import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     try {
//       const user = await this.userService.findAll(email);
//       if(!user) throw new NotFoundException();

//       const comparePassword = await bcrypt.compare(password, user.password);

//       if(comparePassword) {
//           const {} = user;
//       }
//     } catch (error) {}
//   }
}
