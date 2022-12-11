import { ICacheService } from '@app/cache';
import { PrismaService } from '@app/prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from '../subscription/subscription.service';
import { WebhooksController } from './webhooks.controller';
import azureHook from './data.spec.json';

const cache: ICacheService = {
  get: jest.fn(),
  set: jest.fn(),
};

const prisma = jest.fn();

describe('WebhooksController', () => {
  let controller: WebhooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhooksController],
    })
      .useMocker((token) => {
        if (token === SubscriptionService) {
          return { getSubscriptionsForUser: jest.fn().mockResolvedValue([]) };
        }
      })
      .compile();

    controller = module.get<WebhooksController>(WebhooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process azure webhook', async () => {
    expect(await controller.handleAzureWebhook(azureHook)).toEqual(
      'alarm on:' + azureHook.data.AlertRuleName,
    );
  });
});
