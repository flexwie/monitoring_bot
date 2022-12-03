import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { TemplateService } from './template/template.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { BotService } from './bot/bot.service';
import { PassportModule } from '@nestjs/passport';
import { AzureADStrategy } from './auth/aad-guard';
import { ScheduleModule } from '@nestjs/schedule';
import { ToogoodtogoSchedule } from './scheduled/toogoodtogo.scheduled';
import { ScheduledModule } from './scheduled/scheduled.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    BotModule,
    ConfigModule.forRoot(),
    AzureTableStorageModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        connectionString: config.getOrThrow('AZURE_STORAGE_CONNECTION_STRING'),
        accountName: 'fwdatastore',
      }),
    }),
    UserModule,
    PassportModule,
    ScheduleModule.forRoot(),
    ScheduledModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService, TemplateService, ConfigService, AzureADStrategy],
})
export class AppModule {}
