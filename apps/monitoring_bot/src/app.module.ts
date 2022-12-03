import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AzureADStrategy } from './auth/aad-guard';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledModule } from './scheduled/scheduled.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { BullModule } from '@nestjs/bull';

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
  controllers: [AppController],
  providers: [AppService, ConfigService, AzureADStrategy],
})
export class AppModule {}
