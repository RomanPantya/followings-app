import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowingsEntity } from 'src/entities/followings.entity';
import { UserEntity } from 'src/entities/user.entity';
import { OrderByEnum } from 'src/order-by.type';
import { In, Repository } from 'typeorm';
import { GetUserByIdQueryDto } from './query.dto';

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
      select u.id, u.first_name, u.email, u.gender from users u
      inner join followings f
      on u.id = f.user_id
      where f.follower_id = $1;
    `, [userId]);
  }

  getFollowingsForUser(userId: number) {
    return this.usersRepository.query(`
      select u.id, u.first_name, u.email, u.gender from users u
      inner join followings f
      on u.id = f.follower_id
      where f.user_id = $1;
    `, [userId]);
  }

  async getAllInfoForUser(userId: number, options: GetUserByIdQueryDto) {
    const { order_by, order_type } = options;
    const [
      minUserInfo,
      followers,
      followings,
    ] = await Promise.all([
      this.usersRepository.findBy({ id: userId }),
      this.getFollowersForUser(userId),
      this.getFollowingsForUser(userId),
    ]);
    const friends = followings
      .filter(({ id: followingId }: UserEntity) => followers.some(({ id: followerId }: UserEntity) => followingId === followerId))
      .sort((u1: UserEntity, u2: UserEntity) => {
        if (['email', 'gender', 'first_name'].includes(order_by)) {
          return order_type === OrderByEnum.ASC
          ? (u1[order_by as ['email', 'gender', 'first_name'][number]] || '').localeCompare((u2[order_by as ['email', 'gender', 'first_name'][number]] || ''))
          : (u2[order_by as ['email', 'gender', 'first_name'][number]] || '').localeCompare((u1[order_by as ['email', 'gender', 'first_name'][number]] || ''));
        }

        return order_type === OrderByEnum.ASC ? u1.id - u2.id : u2.id - u1.id;
      });

    return {
      minUserInfo,
      friends,
    };
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

    const all = [];

    const result = array.reduce((acc, obj) => {
      //if (obj.following === null)
      if (!acc[obj.id]) acc[obj.id] = {
        first_name: obj.first_name,
        followings: [],
      };

      acc[obj.id].followings.push(obj.following);
      all.push(obj.following);

      return acc;
    }, {} as Record<number, any>);
    const allUsers = await this.usersRepository.find({
      select: {
        first_name: true,
        id: true,
      },
      where: { id: In(Array.from(new Set(all))) }
    });

    Object.values(result).forEach((user: any) => {
      console.log(user);
      user.followings = user.followings.map((id) => allUsers.find((u) => u.id === id));
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

  getTop5() {
    return this.usersRepository.query(`
      select u.id, u.first_name, count(f.user_id) from users u
      join followings f
      on u.id = f.follower_id
      group by id
      order by count desc limit 5
    `)
  }

  // async getOneUsers(userId: number, order_by, order_type) {
  // const arrayFriends = await this.usersRepository.query(`
  //     select u.*, uf.id friend_id, uf.email friend_email, 
  //     uf.first_name friend_first_name, uf.gender friend_gender
  //     from users as u

  //     left join followings as f
  //     on u.id = f.follower_id

  //     inner join
  //     (select u.*, f.* from users as u
  //     left join followings as f
  //     on u.id = f.follower_id) as uf
  //     on f.user_id = uf.follower_id
  //     and f.follower_id = uf.user_id
  //     where u.id > f.user_id
  //     order by $1, $2
  //     `, [order_by, order_type]);

  //  const arrayIdFriends = [];
  //  arrayFriends.forEach(obj => arrayIdFriends.push(obj.id, obj.friend_id));
  //  const arrayIdFriends1 = Array.from(new Set(arrayIdFriends));
  //  if (arrayIdFriends1.includes(userId)) {
  // return arrayFriends.find(obj => obj.id === userId);
  //  } else {

  //   const array = await this.usersRepository.query(`
  //     select distinct u.*, f.user_id as following from users u
  //     left join followings f
  //     on u.id = f.follower_id
  //     order by u.id
  //   `);

  //   const all = [];

  //   const result = array.reduce((acc, obj) => {
  //     //if (obj.following === null)
  //     if (!acc[obj.id]) acc[obj.id] = {
  //       first_name: obj.first_name,
  //       followings: [],
  //     };

  //     acc[obj.id].followings.push(obj.following);
  //     all.push(obj.following);

  //     return acc;
  //   }, {} as Record<number, any>);
  //   const allUsers = await this.usersRepository.find({
  //     select: {
  //       first_name: true,
  //       id: true,
  //     },
  //     where: { id: In(Array.from(new Set(all))) }
  //   });

  //   Object.values(result).forEach((user: any) => {
  //     console.log(user);
  //     user.followings = user.followings.map((id) => allUsers.find((u) => u.id === id));
  //   });

  //   return result;
  // }





  //  }
  //  }

}
