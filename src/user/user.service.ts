import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './interface/user.interface';
import { UserResDTO } from './dto/userRes.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { SignInDTO } from './dto/signIn.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async encryptedPassword(user: User): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }

  async create(user: User): Promise<UserEntity> {
    await this.encryptedPassword(user);
    return await this.usersRepository.save(user);
  }

  async find(email: string): Promise<UserResDTO> {
    const userFind: UserEntity = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!userFind) {
      throw new UnauthorizedException();
    }
    userFind.profileImage = 'http://127.0.0.1:3000/' + userFind.profileImage;
    return {
      nickname: userFind.nickname,
      email: userFind.email,
      profileImage: userFind.profileImage,
    };
  }

  async validateUser(email: string, password: string): Promise<SignInDTO> {
    const userFind: UserEntity = await this.usersRepository.findOneBy({
      email: email,
    });
    const validatePassword = await bcrypt.compare(password, userFind.password);
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException('Sign In Failed');
    }
    userFind.profileImage = 'http://127.0.0.1:3000/' + userFind.profileImage;
    return {
      nickname: userFind.nickname,
      profileImage: userFind.profileImage,
      sessionID: email,
    };
  }

  async modifyNickName(email: string, nickname: string): Promise<UserResDTO> {
    const userFind: UserEntity = await this.usersRepository.findOneBy({
      email: email,
    });
    userFind.nickname = nickname;
    await this.usersRepository.save(userFind);
    userFind.profileImage = 'http://127.0.0.1:3000/' + userFind.profileImage;
    return {
      nickname: userFind.nickname,
      email: userFind.email,
      profileImage: userFind.profileImage,
    };
  }

  async modifyProfile(email: string, file): Promise<UserResDTO> {
    const userFind: UserEntity = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!userFind) {
      throw new UnauthorizedException();
    }
    if (userFind.profileImage != 'NULL') {
      fs.unlink('profiles/' + userFind.profileImage, (error) => {
        if (error) {
          console.log(error);
          console.log('no existing profile match with fs');
        }
      });
    }
    userFind.profileImage = file.filename;
    await this.usersRepository.save(userFind);
    userFind.profileImage = 'http://127.0.0.1:3000/' + userFind.profileImage;
    return {
      nickname: userFind.nickname,
      email: userFind.email,
      profileImage: userFind.profileImage,
    };
  }
}
