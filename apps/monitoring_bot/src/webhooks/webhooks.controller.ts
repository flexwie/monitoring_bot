import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SubscriptionService } from '../subscription/subscription.service';
import { AzureWebhookData } from './types';

@Controller('webhooks')
export class WebhooksController {
  private logger = new Logger(WebhooksController.name);

  constructor(public subService: SubscriptionService) {}

  @Post('azure')
  async handleAzureWebhook(@Body() data: AzureWebhookData) {
    const subs = await this.subService.getSubscriptionsForUser('1');
    return 'alarm on:' + data.data.AlertRuleName;
  }
}
