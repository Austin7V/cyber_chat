import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { ThreadsRepository } from './threads.repository';

@Module({
  providers: [ThreadsService, ThreadsRepository],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
