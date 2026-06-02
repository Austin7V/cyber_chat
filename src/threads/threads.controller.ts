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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CommentsService } from '../comments/comments.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

type RequestWithUser = Request & {
  user: {
    id: string;
    username: string;
  };
};

@UseGuards(JwtAuthGuard)
@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  createThread(
    @Body() createThreadDto: CreateThreadDto,
    @Req() request: RequestWithUser,
  ) {
    return this.threadsService.createThread(
      createThreadDto.title,
      createThreadDto.body,
      request.user.username,
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
    @Req() request: RequestWithUser,
  ) {
    return this.threadsService.updateThread(
      id,
      updateThreadDto,
      request.user.username,
    );
  }

  @Post(':id/comments')
  createCommentForThread(
    @Param('id', ParseUUIDPipe) threadId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: RequestWithUser,
  ) {
    return this.commentsService.createComment(
      threadId,
      createCommentDto.body,
      request.user.username,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    return this.threadsService.deleteThread(id, request.user.username);
  }
}
