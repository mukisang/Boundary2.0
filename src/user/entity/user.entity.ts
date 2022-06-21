import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
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
