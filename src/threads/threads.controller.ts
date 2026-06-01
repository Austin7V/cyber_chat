import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CommentsService } from '../comments/comments.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  findAllThreads(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.threadsService.findAllThreads(paginationQueryDto);
  }

  @Get(':id')
  findThreadById(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.findThreadWithComments(id);
  }

  @Patch(':id')
  updateThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ) {
    return this.threadsService.updateThread(id, updateThreadDto);
  }

  @Post(':id/comments')
  createCommentForThread(
    @Param('id', ParseUUIDPipe) threadId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(
      threadId,
      createCommentDto.body,
      createCommentDto.author,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteThread(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.deleteThread(id);
  }
}
