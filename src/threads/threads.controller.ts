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
import {
  ApiQuery,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

type RequestWithUser = Request & {
  user: {
    id: string;
    username: string;
  };
};

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new thread' })
  @ApiCreatedResponse({ description: 'Thread was created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
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
  @ApiOperation({ summary: 'List all threads with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number. Starts at 1.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 5,
    description: 'Number of threads per page. Maximum is 100.',
  })
  @ApiOkResponse({ description: 'Returns paginated threads.' })
  @ApiBadRequestResponse({ description: 'Invalid pagination query.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  findAllThreads(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.threadsService.findAllThreads(paginationQueryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one thread with its comments' })
  @ApiOkResponse({ description: 'Returns one thread with comments.' })
  @ApiBadRequestResponse({ description: 'Invalid UUID.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  @ApiNotFoundResponse({ description: 'Thread was not found.' })
  findThreadById(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.findThreadWithComments(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one thread' })
  @ApiOkResponse({ description: 'Thread was updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid UUID or validation failed.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  @ApiNotFoundResponse({ description: 'Thread was not found.' })
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
  @ApiOperation({ summary: 'Create a comment for one thread' })
  @ApiCreatedResponse({ description: 'Comment was created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid UUID or validation failed.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  @ApiNotFoundResponse({ description: 'Thread was not found.' })
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
  @ApiOperation({ summary: 'Delete one thread' })
  @ApiNoContentResponse({ description: 'Thread was deleted successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid UUID.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  @ApiNotFoundResponse({ description: 'Thread was not found.' })
  deleteThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    return this.threadsService.deleteThread(id, request.user.username);
  }
}
