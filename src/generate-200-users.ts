import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { DbConnectionOptions } from './db-connection-options';
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
  const dataSource = new DataSource(DbConnectionOptions);
  await dataSource.initialize();
  await generete200users();
  const UserRepo = dataSource.getRepository(UserEntity);
  await UserRepo.insert(users);
}

main();
