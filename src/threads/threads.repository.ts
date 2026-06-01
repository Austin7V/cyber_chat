import { Injectable } from '@nestjs/common';
import { Thread } from './thread.type';

@Injectable()
export class ThreadsRepository {
  private readonly threads = new Map<number, Thread>();
  private nextId = 1;
  create(title: string, body: string, author: string): Thread {
    const thread: Thread = {
      id: this.nextId,
      title,
      author,
      body,
      createdAt: new Date(),
    };
    this.threads.set(thread.id, thread);
    this.nextId++;
    return thread;
  }

  findAll(): Thread[] {
    return Array.from(this.threads.values());
  }
  findById(id: number): Thread | undefined {
    return this.threads.get(id);
  }
  deleteById(id: number): boolean {
    return this.threads.delete(id);
  }
}
