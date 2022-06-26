// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { RoomDTO } from './dto/room.dto';
import { SuccessDTO } from './dto/success.dto';
import { RoomService } from './room.service';

@Controller('chatroom')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('/')
  createChatRoom(
    @Req() Request,
    @Body('title') title,
    @Body('latitude') latitude,
    @Body('longitude') longitude,
  ): Promise<RoomDTO> {
    return this.roomService.create(
      Request.session.key,
      title,
      latitude,
      longitude,
    );
  }

  @Get('/')
  searchChatRoom(
    @Query('latitude') latitude,
    @Query('longitude') longitude,
    @Query('page') page,
  ): Promise<RoomDTO[]> {
    return this.roomService.find(latitude, longitude, page);
  }

  @Get('/check')
  checkRoom(@Req() Request): Promise<SuccessDTO> {
    return this.roomService.check(Request.session.key);
  }

  @Delete('/')
  deleteChatRoom(@Req() Request): Promise<SuccessDTO> {
    return this.roomService.delete(Request.session.key);
  }
}
