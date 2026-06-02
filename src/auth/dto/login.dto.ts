import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'sergey',
    description: 'The username of the registered user.',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    example: 'secret123',
    description: 'The password of the registered user.',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
