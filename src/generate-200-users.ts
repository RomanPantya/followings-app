import { UserEntity } from './entities/user.entity';

function generate200Users() {
  const user: Omit<UserEntity, 'id'> = {
    email: 'test@mail.com',
  };
  console.log('here I will use faker');
}

async function main() {
  const users = generate200Users();

  console.log(users);
}

main();
