import { Injectable } from '@nestjs/common';
import { Comment } from './comment.type';

@Injectable()
export class CommentsRepository {
  private readonly comments = new Map<number, Comment>();
  private nextId = 1;
  create(threadId: number, body: string, author: string): Comment {
    const comment: Comment = {
      id: this.nextId,
      threadId,
      author,
      body,
      createdAt: new Date(),
    };
    this.comments.set(comment.id, comment);
    this.nextId++;
    return comment;
  }
  findById(id: number): Comment | undefined {
    return this.comments.get(id);
  }
  findByThreadId(threadId: number): Comment[] {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.threadId === threadId,
    );
  }

  deleteByThreadId(threadId: number): void {
    for (const comment of this.comments.values()) {
      if (comment.threadId === threadId) {
        this.comments.delete(comment.id);
      }
    }
  }
  markAsDeleted(id: number): Comment | undefined {
    const comment = this.comments.get(id);
    if (!comment) {
      return undefined;
    }
    comment.body = 'deleted';
    this.comments.set(id, comment);
    return comment;
  }
}
