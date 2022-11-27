import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('followings')
export class FollowingsEntity {
  @PrimaryColumn()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user_id!: number;

  @PrimaryColumn()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'follower_id' })
  follower_id!: number;
}
