import { PrismaService } from '@app/prisma';
import { ITooGoodToGoService } from '@app/toogoodtogo';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SubscriptionTypes } from './subscription.constants';

@Injectable()
export class SubscriptionService {
  constructor(
    public client: PrismaService,
    @Inject(ITooGoodToGoService) public tgtgService: ITooGoodToGoService,
  ) {}

  async getSubscriptionsForUser(id: string) {
    return await this.client.subscription.findMany({ where: { user: { id } } });
  }

  async createSubscription(chat_id: string, type: SubscriptionTypes) {
    return await this.client.subscription.create({
      data: { chat_id, type: type },
    });
  }

  async findAllTGTGSubscriptions() {
    return await this.client.subscription.findMany({
      where: { type: SubscriptionTypes.TooGoodToGo },
    });
  }

  /**
   * finds azure subscription with the given id
   * @param id
   */
  async getAzureSubscription(id: string) {
    return this.client.subscription.findFirstOrThrow({
      where: { type: SubscriptionTypes.Azure, id },
    });
  }
}
