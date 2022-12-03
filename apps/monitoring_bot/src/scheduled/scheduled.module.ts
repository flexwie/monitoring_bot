import { ToogoodtogoModule } from '@app/toogoodtogo';
import { Module } from '@nestjs/common';
import { BotModule } from '../bot/bot.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { ToogoodtogoSchedule } from './toogoodtogo.scheduled';
import { CacheModule, ICacheService, LocalCacheService } from '@app/cache';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    SubscriptionModule,
    BotModule,
    ToogoodtogoModule,
    CacheModule,
    PrismaModule,
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
