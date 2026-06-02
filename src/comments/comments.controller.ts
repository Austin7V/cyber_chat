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
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

type RequestWithUser = Request & {
  user: {
    id: string;
    username: string;
  };
};

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  findCommentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findCommentById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markCommentAsDeleted(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    await this.commentsService.markCommentAsDeleted(id, request.user.username);
  }
}
