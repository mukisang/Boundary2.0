import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user.interface';
import { UserEntity } from './entity/user.entity';
import { UserResDTO } from './dto/userRes.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() user: User) {
    this.userService.create(user);
    return 'complete done';
  }

  @Post('signin')
  signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserResDTO> {
    return this.userService.validateUser(email, password);
  }

  @Post('signout')
  signOut(): string {
    return '3';
  }

  @Get('/')
  showMyProfile() {
    return 'my profile';
  }

  @Get('/:id')
  showOthersProfile(@Param('id') id: string): string {
    console.log(id);
    return id;
  }

  @Put('/:email')
  editProfileNickName(@Param('email') email: string): string {
    return email + 'modifiyed';
  }

  @Put('/profile')
  editProfileImage(): string {
    return 'edit profile image';
  }
}
