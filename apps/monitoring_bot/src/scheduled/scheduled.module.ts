import { Module } from '@nestjs/common';
import { BotModule } from '../bot/bot.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { ToogoodtogoSchedule } from './toogoodtogo.scheduled';
import { CacheModule, ICacheService, LocalCacheService } from '@app/cache';
import { PrismaModule } from '@app/prisma';
import {
  ITooGoodToGoService,
  ToogoodtogoModule,
  TooGoodToGoService,
} from '@app/toogoodtogo';

@Module({
  imports: [
    SubscriptionModule,
    BotModule,
    CacheModule,
    PrismaModule,
    ToogoodtogoModule,
  ],
  providers: [
    ToogoodtogoSchedule,
    {
      provide: ICacheService,
      useClass: LocalCacheService,
    },
  ],
})
export class ScheduledModule {}
