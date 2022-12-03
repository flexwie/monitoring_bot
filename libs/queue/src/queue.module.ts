import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueClient } from './queue.client';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'monet',
    }),
  ],
  providers: [QueueClient],
  exports: [BullModule, QueueClient],
})
export class QueueModule {}
