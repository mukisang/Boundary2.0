import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/SignInDTO';
import { SignUpDTO } from './dto/SignUpDTO';
import { User } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: SignUpDTO) {
    this.authService.create(user);
    return 'complete done';
  }

  @Post('signin')
  async signIn(@Body() user: SignInDTO): Promise<User> {
    return this.authService.search(user.email, user.password);
  }

  @Post('signout')
  signOut(): string {
    return '3';
  }
}
