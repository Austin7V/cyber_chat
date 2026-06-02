import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';

type RequestWithUser = Request & {
  user: {
    id: string;
    username: string;
  };
};

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get one comment by id' })
  @ApiOkResponse({ description: 'Returns one comment.' })
  @ApiBadRequestResponse({ description: 'Invalid UUID.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  @ApiNotFoundResponse({ description: 'Comment was not found.' })
  findCommentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findCommentById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete one comment' })
  @ApiNoContentResponse({
    description: 'Comment was marked as deleted successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid UUID.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  @ApiNotFoundResponse({ description: 'Comment was not found.' })
  async markCommentAsDeleted(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    await this.commentsService.markCommentAsDeleted(id, request.user.username);
  }
}
