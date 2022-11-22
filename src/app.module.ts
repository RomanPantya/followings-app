import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConnectionOptions } from './db-connection-options';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(DbConnectionOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
