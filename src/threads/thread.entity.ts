import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comments/comment.entity';

@Entity('threatds')
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  title!: string;
  @Column('text')
  body!: string;
  @CreateDateColumn()
  createdAt!: Date;
  @Column()
  author!: string;
  @OneToMany(() => Comment, (comment) => comment.thread)
  comments!: Comment[];
}
