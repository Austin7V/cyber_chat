import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CommentsService } from '../comments/comments.service';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  createThread(
    @Body('title') title: string,
    @Body('body') body: string,
    @Body('author') author: string,
  ) {
    return this.threadsService.createThread(title, body, author);
  }

  @Get()
  findAllThreads() {
    return this.threadsService.findAllThreads();
  }

  @Get(':id')
  findThreadById(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.findThreadWithComments(id);
  }

  @Post(':id/comments')
  createCommentForThread(
    @Param('id', ParseIntPipe) threadId: number,
    @Body('body') body: string,
    @Body('author') author: string,
  ) {
    return this.commentsService.createComment(threadId, body, author);
  }

  @Delete(':id')
  deleteThread(@Param('id', ParseIntPipe) id: number) {
    this.threadsService.deleteThread(id);
    return {
      message: `Thread with id ${id} deleted`,
    };
  }
}
