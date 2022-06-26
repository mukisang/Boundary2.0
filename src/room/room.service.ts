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
    console.log(userFind);
    const result = await this.roomsRepository
      .createQueryBuilder()
      .insert()
      .into(RoomEntity)
      .values({
        title: title,
        location: () =>
          `ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`,
        generator: userFind,
      })
      .execute();
    userFind.profileImage = 'http://127.0.0.1:3000/' + userFind.profileImage;
    const generator: UserResDTO = {
      nickname: userFind.nickname,
      email: userFind.email,
      profileImage: userFind.profileImage,
    };
    return {
      id: result.raw.insertId,
      title: title,
      location: loc,
      generator: generator,
    };
  }

  async find(latitude: number, longitude: number): Promise<RoomDTO[]> {
    const range = 1000;
    const rooms: RoomEntity[] = await this.roomsRepository
      .createQueryBuilder('room_entity')
      .select()
      .addSelect(
        `ST_DISTANCE_SPHERE(POINT(${longitude} , ${latitude}), location) as distance`,
      )
      // .leftJoinAndSelect('room_entity.generator', 'user_entity')
      .having(`distance <= ${range}`)
      .orderBy('distance', 'ASC')
      .getMany();
    return rooms;
  }
}
