import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async find(email: string, password: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({
      email: email,
      password: password,
    });
  }
}
