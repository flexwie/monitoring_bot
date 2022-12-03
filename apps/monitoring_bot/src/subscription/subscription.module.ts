import { PrismaModule } from '@app/prisma';
import { ToogoodtogoModule } from '@app/toogoodtogo';
import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [ToogoodtogoModule, PrismaModule],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
