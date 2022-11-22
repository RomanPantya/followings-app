import { Entity, PrimaryColumn } from 'typeorm';

@Entity('followings')
export class FollowingsEntity {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  followerId!: number;
}
