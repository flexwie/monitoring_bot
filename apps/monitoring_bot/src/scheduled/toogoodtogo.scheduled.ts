import { ICacheService } from '@app/cache';
import { PrismaService } from '@app/prisma';
import { TooGoodToGoService } from '@app/toogoodtogo';
import { Item, ITooGoodToGoService } from '@app/toogoodtogo';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import moment from 'moment';
import { BotService } from '../bot/bot.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { buildShareLink } from '../bot/keyboards';
import { Markup } from 'telegraf';

@Injectable()
export class ToogoodtogoSchedule {
  public logger = new Logger(ToogoodtogoSchedule.name);

  constructor(
    public subService: SubscriptionService,
    public botService: BotService,
    @Inject(ITooGoodToGoService) public tgtgService: ITooGoodToGoService,
    public client: PrismaService,
    @Inject(ICacheService) public cache: ICacheService,
  ) {}

  @Cron(
    process.env.NODE_ENV == 'production'
      ? '* 9-23 * * *'
      : CronExpression.EVERY_10_SECONDS,
  )
  async process() {
    this.logger.debug('Reporting favorites');
    const subs = await this.subService.findAllTGTGSubscriptions();
    for (const s of subs) {
      const favorites = await this.tgtgService.getFavorites(s.chat_id);

      const m = favorites.map((f) => this.buildMessage(f, s.chat_id));
      await Promise.all(m);
    }
  }

  async buildMessage(fav: Item, chat_id: string) {
    const today = moment().format('yyyy-MM-DD');
    const key = `${today}/${fav.store.store_id}/${chat_id}`;
    if (fav.items_available > 0) {
      const is_reported = this.cache.get(key);
      this.logger.debug(`Fetchin from cache: ${key}`);
      if (!is_reported) {
        this.botService.sendMessage(
          chat_id,
          `🥨 *${fav.store.store_name} just posted!* \nBe fast and grab your bite.`,
          {
            picture: fav.store.cover_picture.current_url,
            keyboard: buildShareLink(fav.item.item_id),
          },
        );

        //set cache
        this.cache.set(key, '1', { ttl: 60 * 60 * 12 });
      }
    }
  }

  //https://share.toogoodtogo.com/login/accept/21522195/9585c6e7-c4fc-4d2a-93b5-79523d03f7d4

  @Cron(CronExpression.EVERY_3_HOURS)
  async refreshCreds() {
    const subs = await this.subService.findAllTGTGSubscriptions();
    for (const s of subs) {
      this.logger.debug(
        'Trying to refresh access token for chat: ' + s.chat_id,
      );
      this.tgtgService.refresh(s.chat_id);
    }
  }
}
