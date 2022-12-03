import { PrismaService } from '@app/prisma';
import { MonetJob } from '@app/queue/types';
import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';

@Injectable()
@Processor('monet')
export class BillingService {
  public logger = new Logger(BillingService.name);

  constructor(public client: PrismaService) {}

  @Process()
  async transcode(job: Job<MonetJob>) {
    this.logger.log('Processing new job');
    const usage = await this.client.usage.create({
      data: {
        user_id: job.data.user_id,
        date: new Date(job.data.date),
      },
      include: { user: true },
    });
    this.logger.log(`Reported usage for: ${usage.user.name}`);
  }

  async getUsage() {
    return this.client.usage.findMany();
  }
}
