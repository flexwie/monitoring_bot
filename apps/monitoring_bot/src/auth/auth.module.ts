import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BotModule } from '../bot/bot.module';
import { AzureADGuard, AzureADStrategy } from './aad-guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [BotModule],
  providers: [ConfigService, AzureADStrategy],
  controllers: [AuthController],
  exports: [AzureADGuard, AzureADStrategy],
})
export class AuthModule {}
