import { Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
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
