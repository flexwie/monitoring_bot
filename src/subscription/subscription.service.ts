import { TooGoodToGoService } from '@app/toogoodtogo';
import { InjectRepository, Repository } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';
import { Subscription } from './subscription.entity';
import { SubscriptionTypes } from './subscription.types';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription) private subRepo: Repository<Subscription>,
    public tgtgService: TooGoodToGoService,
  ) {}

  async getSubscriptionsForUser(id: string) {
    const result = await this.subRepo.where('user_id eq ?', id).findAll();
    return result.entries;
  }

  async createSubscription(chat_id: number, type: SubscriptionTypes) {
    const sub = new Subscription();

    sub.chat_id = chat_id;
    sub.type = type;
    sub.created_at = new Date();

    return await this.subRepo.create(sub);
  }

  async findAllTGTGSubscriptions() {
    return await this.subRepo
      .where('type eq ?', SubscriptionTypes.TOOGOODTOGO)
      .findAll();
  }
}
