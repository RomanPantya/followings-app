import { faker } from '@faker-js/faker';
import { UserEntity } from './entities/user.entity';

const users = [];
generete200users();
function generete200users() {
  Array.from({ length: 10 }).forEach(() => {
    users.push(generateUser());
  });
}
console.log(users);
function generateUser() {
  const user: Omit<UserEntity, 'id'> = new UserEntity();
  user.email = faker.internet.email();
  return user;
}

// async function main() {
//   const users = generate200Users();

//   console.log(users);
// }

// main();
