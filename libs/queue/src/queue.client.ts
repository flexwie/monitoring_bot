import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueClient {
  constructor(@InjectQueue('monet') public queue: Queue) {}

  async reportNotification(user_id: string) {
    await this.queue.add(
      {
        user_id,
        date: new Date().toISOString(),
      },
      {
        removeOnComplete: true,
      },
    );
  }
}
