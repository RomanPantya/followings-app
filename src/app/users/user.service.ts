import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowingsEntity } from 'src/entities/followings.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(FollowingsEntity)
    private followingRepository: Repository<FollowingsEntity>,
  ) { }

  getFollowersForUser(userId: number) {
    return this.usersRepository.query(`
      select u.id, u.first_name from users u
      inner join followings f
      on u.id = f.follower_id
      where f.user_id = $1;
    `, [userId]);
  }

  getAllWithoutFollowings() {
    return this.usersRepository.query(`
      select u.id, u.first_name from users u
      left join followings f
      on u.id = f.follower_id
      where f.follower_id is null
`)
  }

  getAllWithFollowings() {
    return this.usersRepository.query(`
      select distinct u.id, u.first_name from users u
      inner join followings f
      on u.id = f.follower_id
      order by u.id
    `)
  }

  getAll() {
    return this.usersRepository.query(`
      select distinct u.*, f.user_id as following from users u
      left join followings f
      on u.id = f.follower_id
      order by u.id
    `)
  }
}
