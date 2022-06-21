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
  showMyProfile(): Promise<UserResDTO> {
    const email = '1';
    return this.userService.find(email);
  }

  @Get('/:email')
  showOthersProfile(@Param('email') email: string): Promise<UserResDTO> {
    return this.userService.find(email);
  }

  @Put('/')
  editNickName(@Body('nickname') nickname: string): Promise<UserResDTO> {
    const testNickName = '1';
    return this.userService.modifyNickName(testNickName, nickname);
  }

  @Put('/profile')
  editProfileImage(): string {
    return 'edit profile image';
  }
}
// function email(email: any): UserResDTO {
//   throw new Error('Function not implemented.');
// }
