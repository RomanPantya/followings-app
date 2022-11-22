import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @Get()
  getAllWithFollowings() {
    return this.usersRepository.find();
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
