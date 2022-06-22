// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user.interface';
import { UserResDTO } from './dto/userRes.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './lib/multer.options';

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
  @UseInterceptors(FileInterceptor('file', multerOptions))
  editProfileImage(@UploadedFile() file): Promise<UserResDTO> {
    console.log(file);
    return this.userService.modifyProfile('1', file);
  }
}
