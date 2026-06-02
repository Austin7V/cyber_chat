import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Thread } from '../threads/thread.entity';
import { Comment } from './comment.entity';
import { CommentResponseDto } from './dto/comment-response.dto';

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
  ): Promise<CommentResponseDto> {
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

    const savedComment = await this.commentRepository.save(comment);

    return plainToInstance(CommentResponseDto, savedComment);
  }

  async findCommentById(id: string): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return plainToInstance(CommentResponseDto, comment);
  }

  async markCommentAsDeleted(
    id: string,
    username: string,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    if (comment.author !== username) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    comment.body = 'deleted';

    const savedComment = await this.commentRepository.save(comment);

    return plainToInstance(CommentResponseDto, savedComment);
  }
}
