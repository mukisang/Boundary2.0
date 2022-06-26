// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user.interface';
import { UserResDTO } from './dto/userRes.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './lib/multer.options';
import { UserRequest } from './interface/userRequest.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() user: User) {
    this.userService.create(user);
    return 'complete done';
  }

  @Post('signin')
  async signIn(
    @Req() req: UserRequest,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserResDTO> {
    const signInDTO = await this.userService.validateUser(email, password);
    req.session.key = signInDTO.sessionID;
    return {
      nickname: signInDTO.nickname,
      email: email,
      profileImage: signInDTO.profileImage,
    };
  }

  @Post('signout')
  signOut(@Req() req: UserRequest): any {
    req.session.destroy();
    // req.clearCookie('connect.sid');
    return { message: 'complete done' };
  }

  @Get('/')
  showMyProfile(@Req() req: UserRequest): Promise<UserResDTO> {
    const email = req.session.key;
    return this.userService.find(email);
  }

  @Get('/:email')
  showOthersProfile(@Param('email') email: string): Promise<UserResDTO> {
    return this.userService.find(email);
  }

  @Put('/')
  editNickName(
    @Req() req: UserRequest,
    @Body('nickname') nickname: string,
  ): Promise<UserResDTO> {
    const email = req.session.key;
    return this.userService.modifyNickName(email, nickname);
  }

  @Put('/profile')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  editProfileImage(
    @Req() req: UserRequest,
    @UploadedFile() file,
  ): Promise<UserResDTO> {
    const email = req.session.key;
    return this.userService.modifyProfile(email, file);
  }
}
