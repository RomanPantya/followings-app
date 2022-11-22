import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserController } from 'src/app/users/user.controller';
import { UserService } from './user.service';
import { FollowingsEntity } from 'src/entities/followings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowingsEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
