import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConnectionOptions } from './db-connection-options';

@Module({
  imports: [TypeOrmModule.forRoot(DbConnectionOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
