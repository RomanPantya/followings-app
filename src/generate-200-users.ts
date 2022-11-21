import { UserEntity } from './entities/user.entity';

function generate200Users() {
  // const users: Omit<UserEntity, 'id'>[] = // TODO

  // return users;
}

async function main() {
  const users = generate200Users();

  console.log(users);
}

main();
