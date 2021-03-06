import { RoomEntity } from 'src/room/entity/room.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ default: null })
  profileImage: string;

  @Column({ default: false })
  isGenerator: boolean;
}
