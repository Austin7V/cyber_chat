import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.type';
import { CommentsRepository } from './comments.repository';
import { ThreadsRepository } from '../threads/threads.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly threadsRepository: ThreadsRepository,
  ) {}

  createComment(threadId: number, body: string, author: string): Comment {
    const thread = this.threadsRepository.findById(threadId);
    if (!thread) {
      throw new NotFoundException(`Thread with id ${threadId} not found`);
    }
    return this.commentsRepository.create(threadId, body, author);
  }

  findCommentById(id: number): Comment {
    const comment = this.commentsRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }
  markCommentAsDeleted(id: number): Comment {
    const comment = this.commentsRepository.markAsDeleted(id);
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }
}
