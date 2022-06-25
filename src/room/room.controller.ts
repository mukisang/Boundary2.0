import { Body, Controller, Post, Req } from '@nestjs/common';
import { RoomDTO } from './dto/room.dto';
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
}