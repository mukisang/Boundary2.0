import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry } from 'geojson';
import { UserResDTO } from 'src/user/dto/userRes.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from './dto/room.dto';
import { RoomEntity } from './entity/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomsRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(
    email: string,
    title: string,
    latitude: number,
    longitude: number,
  ): Promise<RoomDTO> {
    const userFind: UserEntity = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!userFind) {
      throw new UnauthorizedException();
    }
    if (userFind.isGenerator) {
      throw new NotAcceptableException('generator already has rooms');
    }
    const loc: Geometry = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
    const room = await this.roomsRepository.create({
      title: title,
      location: loc,
      generator: userFind,
    });
    userFind.profileImage = 'http://127.0.0.1:3000/' + userFind.profileImage;
    const generator: UserResDTO = {
      nickname: userFind.nickname,
      email: userFind.email,
      profileImage: userFind.profileImage,
    };
    return {
      id: room.id,
      title: room.title,
      location: room.location,
      generator: generator,
    };
  }
}
