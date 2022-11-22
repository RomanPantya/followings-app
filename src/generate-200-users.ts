import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';

const users = [];

function generete200users() {
  Array.from({ length: 10 }).forEach(() => {
    users.push(generateUser());
  });
}

function generateUser() {
  const user: Omit<UserEntity, 'id'> = new UserEntity();
  user.email = faker.internet.email();
  return user;
}

async function main() {
  const dataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres' | 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: true,
    entities: [UserEntity],
  });
  await dataSource.initialize();
  await generete200users();
  const UserRepo = dataSource.getRepository(UserEntity);
  await UserRepo.insert(users);
}

main();
