import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('max-following')
  getTop5() {
    return this.userService.getTop5();
  }

  @Get('followings')
  getAllWithFollowings() {
    return this.userService.getAllWithFollowings();
  }

  @Get('not-following')
  getAllWithoutFollowings() {
    return this.userService.getAllWithoutFollowings();
  }

  @Get(':id/followers')
  getFollowersForUser(
    @Param('id') userId: number,
  ) {
    return this.userService.getFollowersForUser(userId);
  }

  @Get('friends')
  getAllFriends() { 
    return this.userService.getAllFriends()
  }

  @Get(':id')
  getUserById() {
    return 'Get user by id';
  }

  @Get()
  getAll() {
    return this.userService.getAll()
  }
}
