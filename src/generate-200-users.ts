import { faker } from '@faker-js/faker';
import { UserEntity } from './entities/user.entity';

const users = [];
Array.from({ length: 10 }).forEach(() => {
  users.push(generate200Users());
});
function generate200Users() {
  const user: Omit<UserEntity, 'id'> = new UserEntity();
  user.email = faker.internet.email();
  return user;
}
console.log(users);

// async function main() {
//   const users = generate200Users();

//   console.log(users);
// }

// main();
