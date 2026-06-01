import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thread } from './thread.entity';
import { Comment } from '../comments/comment.entity';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createThread(
    title: string,
    body: string,
    author: string,
  ): Promise<Thread> {
    const thread = this.threadRepository.create({
      title,
      body,
      author,
    });

    return this.threadRepository.save(thread);
  }

  async findAllThreads(): Promise<Thread[]> {
    return this.threadRepository.find();
  }

  async findThreadWithComments(id: string): Promise<Thread> {
    const thread = await this.threadRepository.findOne({
      where: { id },
      relations: {
        comments: true,
      },
    });
    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }
    return thread;
  }

  async deleteThread(id: string): Promise<void> {
    const thread = await this.threadRepository.findOne({
      where: { id },
    });
    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }
    await this.commentRepository.delete({
      thread: {
        id,
      },
    });
    await this.threadRepository.delete(id);
  }
}
