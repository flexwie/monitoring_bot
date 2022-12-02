import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from 'src/bot/bot.module';
import { BotService } from 'src/bot/bot.service';
import { AzureADGuard, AzureADStrategy } from './aad-guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [BotModule],
  providers: [ConfigService, AzureADStrategy],
  controllers: [AuthController],
  exports: [AzureADGuard, AzureADStrategy],
})
export class AuthModule {}
