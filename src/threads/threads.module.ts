import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';
import { Thread } from './thread.entity';
import { Comment } from '../comments/comment.entity';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Thread, Comment]),
    forwardRef(() => CommentsModule),
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
