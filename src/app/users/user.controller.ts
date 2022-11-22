import { Controller, Get, Param } from '@nestjs/common';
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

  @Get(':id/followers')
  getFollowersForUser(
    @Param('id') userId: number,
  ) {
    return this.userService.getFollowersForUser(userId);
  }
}
