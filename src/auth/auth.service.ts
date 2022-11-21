import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersSvc: UsersService,
    private readonly jwtSvc: JwtService,
  ) {}
  async login(dto: AuthDto) {
    const existingUser = await this.usersSvc.findOne(dto.username);
    if (!existingUser) {
      throw new NotFoundException('username is not registered');
    }
    const passwordValid = await bcrypt.compare(dto.password, existingUser.hash);
    const payload = {
      sub: existingUser.id,
      name: existingUser.name,
      username: existingUser.username,
      isAdmin: existingUser.isAdmin,
    };
    if (passwordValid) {
      return {
        access_token: this.jwtSvc.sign(payload, { expiresIn: '30m' }),
        refresh_token: this.jwtSvc.sign(payload, { expiresIn: '24h' }),
      };
    } else {
      throw new BadRequestException("password didn't match");
    }
  }
  async signup(dto: CreateUserDto) {
    return this.usersSvc.createUser(dto);
  }
  async adminSignup(dto: CreateUserDto) {
    return this.usersSvc.createAdminUser(dto);
  }
  async validateUser(username: string, password: string) {
    const user = await this.usersSvc.findOne(username);

    if (user === null) {
      return null;
    }
    const passwordValid = await bcrypt.compare(password, user.hash);
    if (!passwordValid) return null;
    console.log('user', user);
    return user;
  }
}
