import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { config } from 'dotenv';
import { join } from 'path';

config();
config({ path: join(process.cwd(), '.default.env') });

function generete200users() {
  return Array.from({ length: 10 }).map(() => {
    return generateUser();
  });
}

function generateUser(): Omit<UserEntity, 'id'> {
  return {
    email: faker.internet.email(),
  };
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
    entities: [UserEntity],
  }).initialize();

  const UserRepo = dataSource.getRepository(UserEntity);

  await UserRepo.insert(generete200users());
}

main();
