import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CommentsService } from '../comments/comments.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  createThread(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.createThread(
      createThreadDto.title,
      createThreadDto.body,
      createThreadDto.author,
    );
  }

  @Get()
  findAllThreads() {
    return this.threadsService.findAllThreads();
  }

  @Get(':id')
  findThreadById(@Param('id') id: string) {
    return this.threadsService.findThreadWithComments(id);
  }

  @Post(':id/comments')
  createCommentForThread(
    @Param('id') threadId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(
      threadId,
      createCommentDto.body,
      createCommentDto.author,
    );
  }

  @Patch(':id')
  updateThread(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ) {
    return this.threadsService.updateThread(id, updateThreadDto);
  }

  @Delete(':id')
  deleteThread(@Param('id') id: string) {
    return this.threadsService.deleteThread(id);
  }
}
