import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledModule } from './scheduled/scheduled.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { BullModule } from '@nestjs/bull';
import { WebhooksController } from './webhooks/webhooks.controller';

@Module({
  imports: [
    BotModule,
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    ScheduleModule.forRoot(),
    ScheduledModule,
    SubscriptionModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.getOrThrow('REDIS_HOST'),
          password: config.getOrThrow('REDIS_PASSWORD'),
          port: 6379,
        },
      }),
    }),
  ],
  providers: [AppService, ConfigService],
  controllers: [WebhooksController],
})
export class AppModule {}
