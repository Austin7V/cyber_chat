import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { Thread } from '../threads/thread.entity';
import { ThreadsModule } from '../threads/threads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Thread]),
    forwardRef(() => ThreadsModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
