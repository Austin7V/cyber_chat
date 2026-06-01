import { Injectable, NotFoundException } from '@nestjs/common';
import { Thread } from './thread.type';
import { ThreadsRepository } from './threads.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { Comment } from '../comments/comment.type';

type ThreadWithComments = Thread & {
  comments: Comment[];
};

@Injectable()
export class ThreadsService {
  constructor(
    private readonly threadsRepository: ThreadsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  createThread(title: string, body: string, author: string): Thread {
    return this.threadsRepository.create(title, body, author);
  }

  findAllThreads(): Thread[] {
    return this.threadsRepository.findAll();
  }

  findThreadWithComments(id: number): ThreadWithComments {
    const thread = this.threadsRepository.findById(id);
    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }
    const comments = this.commentsRepository.findByThreadId(id);
    return {
      ...thread,
      comments,
    };
  }

  deleteThread(id: number): void {
    const thread = this.threadsRepository.findById(id);
    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }
    this.threadsRepository.deleteById(id);
    this.commentsRepository.deleteByThreadId(id);
  }
}
