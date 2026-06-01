import { Expose, Type } from 'class-transformer';

export class CommentResponseDto {
  @Expose()
  id!: string;

  @Expose()
  body!: string;

  @Expose()
  author!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}
