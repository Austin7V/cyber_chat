import { Expose, Type } from 'class-transformer';
import { CommentResponseDto } from '../../comments/dto/comment-response.dto';

export class ThreadResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  body!: string;

  @Expose()
  author!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;

  @Expose()
  @Type(() => CommentResponseDto)
  comments?: CommentResponseDto[];
}
