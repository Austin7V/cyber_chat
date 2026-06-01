import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  findCommentById(@Param('id') id: string) {
    return this.commentsService.findCommentById(id);
  }

  @Delete(':id')
  markCommentAsDeleted(@Param('id') id: string) {
    return this.commentsService.markCommentAsDeleted(id);
  }
}
