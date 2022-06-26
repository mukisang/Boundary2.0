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
import * as bcrypt from 'bcrypt';
import { SuccessDTO } from './dto/success.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomsRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  PAGECNT = 5;
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
    const roomId: string = await bcrypt.hash(userFind.email, 10);
    const result = await this.roomsRepository
      .createQueryBuilder()
      .insert()
      .into(RoomEntity)
      .values({
        roomId: roomId,
        title: title,
        location: () =>
          `ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`,
        generator: userFind,
      })
      .execute();
    userFind.isGenerator = true;
    await this.usersRepository.save(userFind);
    userFind.profileImage = 'http://127.0.0.1:3000/' + userFind.profileImage;
    const generator: UserResDTO = {
      nickname: userFind.nickname,
      email: userFind.email,
      profileImage: userFind.profileImage,
    };
    return {
      roomId: roomId,
      title: title,
      location: loc,
      generator: generator,
    };
  }

  async find(
    latitude: number,
    longitude: number,
    page: number,
  ): Promise<RoomDTO[]> {
    const range = 1000;
    let skip = 0;
    if (page || page >= 1) {
      skip = (page - 1) * this.PAGECNT;
    } else {
      skip = 0;
    }

    const rooms: RoomDTO[] = await this.roomsRepository
      .createQueryBuilder('room_entity')
      .select([
        'room_entity.id',
        'room_entity.title',
        'room_entity.location',
        'user_entity.nickname',
        'user_entity.email',
        'user_entity.profileImage',
      ])
      .addSelect(
        `ST_DISTANCE_SPHERE(POINT(${longitude} , ${latitude}), location) as distance`,
      )
      .leftJoinAndSelect('room_entity.generator', 'user_entity')
      .having(`distance <= ${range}`)
      .orderBy('distance', 'ASC')
      .limit(this.PAGECNT)
      .offset(skip)
      .getMany();
    rooms.map((room: RoomDTO) => {
      if (room.generator && room.generator.profileImage) {
        room.generator.profileImage =
          'http://127.0.0.1:3000/' + room.generator.profileImage;
      }
      const roomRes: UserResDTO = {
        nickname: room.generator.nickname,
        email: room.generator.email,
        profileImage: room.generator.profileImage,
      };
      room.generator = roomRes;
    });
    return rooms;
  }

  async check(email: string): Promise<SuccessDTO> {
    const userFind: UserEntity = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!userFind) {
      throw new UnauthorizedException();
    }
    return {
      message: `${userFind.isGenerator}`,
    };
  }

  async delete(email: string): Promise<SuccessDTO> {
    const room = await this.roomsRepository
      .createQueryBuilder('room_entity')
      .select()
      .leftJoinAndSelect('room_entity.generator', 'user_entity')
      .where(`user_entity.email = ${email}`)
      .execute();
    if (!room[0] || !room[0].room_entity_id)
      throw new NotAcceptableException('room not found');
    const roomId = room[0].room_entity_id;
    const generator = await this.usersRepository.findOneBy({
      email: email,
    });
    generator.isGenerator = false;
    await this.usersRepository.save(generator);
    await this.roomsRepository.delete({ id: roomId });
    return {
      message: 'success',
    };
  }
}
