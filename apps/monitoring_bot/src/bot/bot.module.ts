import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { UserService } from '../user/user.service';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { OnboardingScene } from './onboarding.scene';
import { session } from 'telegraf';
import { SubscriptionModule } from '../subscription/subscription.module';
import { TgTgScene } from './tgtg.scene';
import { ToogoodtogoModule } from '@app/toogoodtogo';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    PrismaModule,
    SubscriptionModule,
    ToogoodtogoModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          token: config.getOrThrow('BOT_TOKEN'),
          middlewares: [session()],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    ConfigService,
    BotUpdate,
    BotService,
    UserService,
    OnboardingScene,
    TgTgScene,
  ],
  exports: [BotService],
})
export class BotModule {}
