import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Thread } from '../threads/thread.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
  ) {}

  async createComment(
    threadId: string,
    body: string,
    author: string,
  ): Promise<Comment> {
    const thread = await this.threadRepository.findOne({
      where: { id: threadId },
    });
    if (!thread) {
      throw new NotFoundException(`Thread with id ${threadId} not found`);
    }
    const comment = this.commentRepository.create({
      body,
      author,
      thread,
    });
    return this.commentRepository.save(comment);
  }

  async findCommentById(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }

  async markCommentAsDeleted(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    comment.body = 'deleted';
    return this.commentRepository.save(comment);
  }
}
