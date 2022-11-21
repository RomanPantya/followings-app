import { faker } from '@faker-js/faker';
import { UserEntity } from './entities/user.entity';

function generate200Users() {
 // const users = [];
  const user: Omit<UserEntity, 'id'> = new UserEntity();
  user.email = faker.internet.email();

  console.log(user);
}

async function main() {
  const users = generate200Users();

  console.log(users);
}

main();
