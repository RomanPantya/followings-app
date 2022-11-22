import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('max-following')
  getTop5() {
    return 'Get top 5 users';
  }

  @Get('not-following')
  getAllWithoutFollowings() {
    return 'Get all users without followings';
  }

  @Get(':id')
  getUserById() {
    return 'Get user by id';
  }

  @Get()
  getAllWithFollowings() {
    return 'Get all';
  }
}
