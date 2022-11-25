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

  async getAll() {
    const result = await this.usersRepository.query(`
      select distinct u.*, f.user_id as following from users u
      left join followings f
      on u.id = f.follower_id
      order by u.id
    `);
    // return array.reduce((acc, obj) => {
    //   if (!acc[obj.id]) acc[obj.id] = [];



    //   return acc;
    // }, {} as Record<number, any>);
    // console.log(array);
    const arrWithoutCopy = [result[0]];
    for (let i = 1; i < result.length; ++i) {
      if (result[i].id === arrWithoutCopy[arrWithoutCopy.length - 1].id) {

        if (arrWithoutCopy[arrWithoutCopy.length - 1].following.length) {
          arrWithoutCopy[arrWithoutCopy.length - 1].following.push(result[i].following);
        } else {
          arrWithoutCopy[arrWithoutCopy.length - 1].following = [arrWithoutCopy[arrWithoutCopy.length - 1].following];
          arrWithoutCopy[arrWithoutCopy.length - 1].following.push(result[i].following);
        }
        continue;
      }

      arrWithoutCopy.push(result[i]);
    }

    return arrWithoutCopy;
  }

  getAllFriends() {
    return this.usersRepository.query(`
    select first.id, first.first_name, second.id, second.first_name

from 

(select * from users
right join followings
on users.id = followings.follower_id) as first

inner join

(select * from users
right join followings
on users.id = followings.follower_id) as second

on first.user_id = second.follower_id

where first.follower_id = second.user_id


order by first.id

    `)
  }
}
