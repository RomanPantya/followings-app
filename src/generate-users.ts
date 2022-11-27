import { faker } from '@faker-js/faker';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { config } from 'dotenv';
import { join } from 'path';
import { FollowingsEntity } from './entities/followings.entity';
import { getRandomBool, getRandomInt } from './utils/random-number.util';

config();
config({ path: join(process.cwd(), '.default.env') });

function genereteUsers(count = 200): Omit<UserEntity, 'id'>[] {
  return Array.from({ length: count }).map(() => {
    const gender: 'male' | 'female' =
      getRandomBool() ? 'female' : 'male';
    const first_name = faker.name.firstName(gender);
    const email = faker.internet.email(first_name);

    return {
      email,
      first_name,
      gender,
    };
  });
}

// "userId" start following "followerId"
async function makeFollowing(repo: Repository<FollowingsEntity>, following: FollowingsEntity) {
  try {
    await repo.insert(following);
  } catch (error) {
    // it means such following reloation is already exists
  }
}

async function main() {
  const dataSource = await new DataSource({
    type: process.env.DB_TYPE as 'postgres' | 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: true,
    entities: [UserEntity, FollowingsEntity],
  }).initialize();

  const UserRepo = dataSource.getRepository(UserEntity);
  const FollowingRepo = dataSource.getRepository(FollowingsEntity);

  const args = process.argv.slice(2);

  if (args.includes('--fresh')) {
    await FollowingRepo.delete({});
    await UserRepo.delete({});
  }

  const count = +args.find((arg) => /--count=\d{1,6}/.test(arg))?.split('=')[1] || undefined;



  const { raw } = await UserRepo.insert(genereteUsers(count));
  const generatedUsers = raw.map(({ id }) => id);
  const all = await UserRepo.find();
  const allUsers = all.map(({ id }) => id);
  const totalUsersCount = allUsers.length;


  const promises = generatedUsers.map((userId) => {
    const x = getRandomInt(0, 10_000);

    if (x % 5 === 0) return Promise.resolve();
    else if (x % 3 === 0) {
      return Promise.all(
        Array.from({ length: getRandomInt(1, 11) })
          .map(() => makeFollowing(FollowingRepo, {
            user_id: allUsers[getRandomInt(0, totalUsersCount)],
            follower_id: userId,
          })));
    } else if (x % 4) {
      return Promise.all(
        Array.from({ length: getRandomInt(1, 5) })
          .map(() => makeFollowing(FollowingRepo, {
            user_id: allUsers[getRandomInt(0, totalUsersCount)],
            follower_id: userId,
          })));
    }

    return makeFollowing(FollowingRepo, { user_id: generatedUsers[getRandomInt(0, totalUsersCount)], follower_id: userId });
  });

  await Promise.all(promises);
  await dataSource.destroy();
}

main();
