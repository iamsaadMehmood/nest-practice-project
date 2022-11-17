import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() body: AuthDto) {
    return this.authSvc.login(body);
  }
  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.authSvc.signup(body);
  }
}
