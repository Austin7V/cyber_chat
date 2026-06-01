import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  findCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findCommentById(id);
  }

  @Delete(':id')
  markCommentAsDeleted(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.markCommentAsDeleted(id);
  }
}
