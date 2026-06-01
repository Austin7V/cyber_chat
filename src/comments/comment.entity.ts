import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Thread } from '../threads/thread.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  body: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  author: string;
  @ManyToOne(() => Thread, (thread) => thread.comments, { onDelete: 'CASCADE' })
  thread: Thread;
}
