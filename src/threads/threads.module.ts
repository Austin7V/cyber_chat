import { Module, forwardRef } from '@nestjs/common';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';
import { ThreadsRepository } from './threads.repository';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [forwardRef(() => CommentsModule)],
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository],
  exports: [ThreadsRepository],
})
export class ThreadsModule {}
