import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './interface/user.interface';
import { UserResDTO } from './dto/userRes.dto';
import * as bcrypt from 'bcrypt';

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

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async validateUser(email: string, password: string): Promise<UserResDTO> {
    const userFind: UserEntity = await this.usersRepository.findOneBy({
      email: email,
    });
    const validatePassword = await bcrypt.compare(password, userFind.password);
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    const res: UserResDTO = {
      nickname: userFind.nickname,
      email: userFind.email,
    };
    return res;
  }
}
