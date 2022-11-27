import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionOptions } from '../db-connection-options';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(DbConnectionOptions)],
})
export class AppModule {}
