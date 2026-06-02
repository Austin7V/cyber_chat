import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    example: 'How do JWT guards work?',
    description: 'The title of the thread.',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @ApiProperty({
    example: 'I want to understand how JwtAuthGuard protects routes.',
    description: 'The main content of the thread.',
    minLength: 5,
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(2000)
  body!: string;
}
