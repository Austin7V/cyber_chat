import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/cyber-chat.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ThreadsModule,
    CommentsModule,
    UsersModule,
  ],
})
export class AppModule {}
