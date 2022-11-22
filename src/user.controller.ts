import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getAllWithFollowings() {
    return 'Get all users with followings';
  }
  @Get('/max-following')
  getTop5() {
    return 'Get top 5 users';
  }
  @Get('/not-following')
  getAllWithoutFollowings() {
    return 'Get all users without followings';
  }
  @Get(':id/')
  getUserById() {
    return 'Get user by id';
  }
}
