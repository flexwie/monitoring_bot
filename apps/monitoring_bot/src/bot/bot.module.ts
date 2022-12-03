import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { TemplateService } from '../template/template.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { OnboardingScene } from './onboarding.scene';
import { session } from 'telegraf';
import { SubscriptionModule } from '../subscription/subscription.module';
import { TgTgScene } from './tgtg.scene';
import { ToogoodtogoModule } from '@app/toogoodtogo';

@Module({
  imports: [
    SubscriptionModule,
    ToogoodtogoModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        // const session = new AzureTableStorageSession({
        //   store: {
        //     accountName: config.getOrThrow('AZURE_STORAGE_ACCOUNT'),
        //     accountKey: config.getOrThrow('AZURE_STORAGE_ACCESS_KEY'),
        //   },
        // });
        return {
          token: config.getOrThrow('BOT_TOKEN'),
          middlewares: [session()],
        };
      },
      inject: [ConfigService],
    }),
    AzureTableStorageModule.forFeature(User, {
      table: 'user',
      createTableIfNotExists: true,
    }),
  ],
  providers: [
    ConfigService,
    BotUpdate,
    BotService,
    TemplateService,
    UserService,
    OnboardingScene,
    TgTgScene,
  ],
  exports: [BotService],
})
export class BotModule {}
