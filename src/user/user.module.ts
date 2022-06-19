import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
