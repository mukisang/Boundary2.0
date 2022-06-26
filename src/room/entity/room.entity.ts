// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryGeneratedColumn, Index, OneToOne, JoinColumn } from 'typeorm';
import { Point } from 'geojson';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Index({ spatial: true })
  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  location: Point;

  @OneToOne(() => UserEntity)
  // @JoinColumn()
  generator: UserEntity;
}
