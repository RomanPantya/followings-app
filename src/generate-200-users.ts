import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { config } from 'dotenv';
import { join } from 'path';
import { FollowingsEntity } from './entities/followings.entity';
import random from 'random';

config();
config({ path: join(process.cwd(), '.default.env') });

function generete200users(): Omit<UserEntity, 'id'>[] {
  const gender = random.boolean() ? ('male' as const) : ('female' as const);
  const first_name = faker.name.firstName(gender);
  const email = faker.internet.email(first_name);

  return Array.from({ length: 10 }).map(() => ({
    email,
    first_name,
    gender,
  }));
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

  await UserRepo.insert(generete200users());
}

main();
