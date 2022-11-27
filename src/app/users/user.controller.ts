import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserByIdQueryDto } from './query.dto';

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
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.getFollowersForUser(userId);
  }

  @Get('friends')
  getAllFriends() { 
    return this.userService.getAllFriends()
  }

  @Get(':id/friends')
  getUserById(
   @Param('id', ParseIntPipe) userId: number,
   @Query() options: GetUserByIdQueryDto,
  ) { 
    return this.userService.getAllInfoForUser(userId, options);
  }
}
