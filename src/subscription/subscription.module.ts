import { ToogoodtogoModule } from '@app/toogoodtogo';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    ToogoodtogoModule,
    AzureTableStorageModule.forFeature(Subscription, {
      table: 'subscription',
      createTableIfNotExists: true,
    }),
  ],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
