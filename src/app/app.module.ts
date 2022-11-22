import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConnectionOptions } from '../db-connection-options';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(DbConnectionOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
