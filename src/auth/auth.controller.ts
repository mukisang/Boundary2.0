import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signInDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() user: SignInDTO) {
    this.authService.create(user);
    return 'complete done';
  }

  @Post('signin')
  signIn(@Body() user: SignInDTO): SignInDTO {
    return this.authService.search(user);
  }

  @Post('signout')
  signOut(): string {
    return '3';
  }
}
