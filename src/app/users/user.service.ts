import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowingsEntity } from 'src/entities/followings.entity';
import { UserEntity } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';

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
    const array = await this.usersRepository.query(`
      select distinct u.*, f.user_id as following from users u
      left join followings f
      on u.id = f.follower_id
      order by u.id
    `);
    console.log(array);

    const all = [];

    const result = array.reduce((acc, obj) => {
      console.log(obj);
      if (obj.following === null) return acc;
      if (!acc[obj.id]) acc[obj.id] = {
        first_name: obj.first_name,
        followings: [],
      };

      acc[obj.id].followings.push(obj.following);
      all.push(obj.following);



      return acc;
    }, {} as Record<number, any>);
    const allUsers = await this.usersRepository.findBy({ id: In(all)});

    Object.values(result).forEach((user: any) => {
      console.log(user);
      user.followings = user.followings.map((id) => allUsers.find((u) => u.id = id));
    });

    return result;
  }

  getAllFriends() {
    return this.usersRepository.query(`
      select
      u.first_name friend_one, u.id, uf.first_name friend_two, uf.id _id
      from users as u

      left join followings as f
      on u.id = f.follower_id

      inner join
      (select u.first_name, u.id, f.* from users as u
      left join followings as f
      on u.id = f.follower_id) as uf
      on f.user_id = uf.follower_id
	    and f.follower_id = uf.user_id
      where u.id > f.user_id
    `)
  }
}
