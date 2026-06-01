import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Comment } from '../comments/comment.entity';
import { Thread } from './thread.entity';
import { ThreadResponseDto } from './dto/thread-response.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

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
  ): Promise<ThreadResponseDto> {
    const thread = this.threadRepository.create({
      title,
      body,
      author,
    });

    const savedThread = await this.threadRepository.save(thread);

    return plainToInstance(ThreadResponseDto, savedThread);
  }

  async findAllThreads(): Promise<ThreadResponseDto[]> {
    const threads = await this.threadRepository.find();

    return plainToInstance(ThreadResponseDto, threads);
  }

  async findThreadWithComments(id: string): Promise<ThreadResponseDto> {
    const thread = await this.threadRepository.findOne({
      where: { id },
      relations: {
        comments: true,
      },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }

    return plainToInstance(ThreadResponseDto, thread);
  }

  async updateThread(
    id: string,
    updateThreadDto: UpdateThreadDto,
  ): Promise<ThreadResponseDto> {
    const thread = await this.threadRepository.findOne({
      where: { id },
    });

    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }

    Object.assign(thread, updateThreadDto);

    const savedThread = await this.threadRepository.save(thread);

    return plainToInstance(ThreadResponseDto, savedThread);
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
