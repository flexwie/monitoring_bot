import { ICacheService } from '@app/cache';
import { PrismaService } from '@app/prisma';
import { TooGoodToGoService } from '@app/toogoodtogo';
import { Item } from '@app/toogoodtogo/types';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import moment from 'moment';
import { BotService } from '../bot/bot.service';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class ToogoodtogoSchedule {
  public logger = new Logger(ToogoodtogoSchedule.name);

  constructor(
    public subService: SubscriptionService,
    public botService: BotService,
    public tgtgService: TooGoodToGoService,
    public client: PrismaService,
    @Inject(ICacheService) public cache: ICacheService,
  ) {}

  //@Cron('* 17-23 * * 1-6')
  //@Cron(CronExpression.EVERY_10_SECONDS)
  async process() {
    const subs = await this.subService.findAllTGTGSubscriptions();
    for (const s of subs) {
      const favorites = await this.tgtgService.getFavorites(
        parseInt(s.chat_id as any),
      );

      const m = favorites.map((f) => this.buildMessage(f, s.chat_id));
      await Promise.all(m);
    }
  }

  async buildMessage(fav: Item, chat_id: number) {
    const today = moment().format('yyyy-MM-DD');
    if (fav.items_available > 0) {
      const is_reported = this.cache.get(
        `${today}/${fav.store.store_id}/${chat_id}`,
      );
      if (!is_reported) {
        this.botService.sendMessage(
          chat_id,
          `New product at ${fav.store.store_name}`,
        );
      }
    }
  }

  @Cron(CronExpression.EVERY_3_HOURS)
  async refreshCreds() {
    const subs = await this.subService.findAllTGTGSubscriptions();
    for (const s of subs) {
      this.logger.debug(
        'Trying to refresh access token for chat: ' + s.chat_id,
      );
      this.tgtgService.refresh(parseInt(s.chat_id as any));
    }
  }
}
