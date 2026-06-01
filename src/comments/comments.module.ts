import { Module, forwardRef } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { ThreadsModule } from '../threads/threads.module';

@Module({
  imports: [forwardRef(() => ThreadsModule)],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsRepository],
})
export class CommentsModule {}
