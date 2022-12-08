import { PrismaService } from '@app/prisma';
import { ITooGoodToGoService } from '@app/toogoodtogo';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, SubscriptionTypes } from '@prisma/client';

@Injectable()
export class SubscriptionService {
  constructor(
    public client: PrismaService,
    @Inject(ITooGoodToGoService) public tgtgService: ITooGoodToGoService,
  ) {}

  async getSubscriptionsForUser(id: string) {
    return await this.client.subscription.findMany({ where: { user: { id } } });
  }

  async createSubscription(chat_id: number, type: SubscriptionTypes) {
    return await this.client.subscription.create({
      data: { chat_id, type: type },
    });
  }

  async findAllTGTGSubscriptions() {
    return await this.client.subscription.findMany({
      where: { type: SubscriptionTypes.TooGoodToGo },
    });
  }
}
