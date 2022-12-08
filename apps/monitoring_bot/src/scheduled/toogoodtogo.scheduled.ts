import { ICacheService } from '@app/cache';
import { PrismaService } from '@app/prisma';
import { TooGoodToGoService } from '@app/toogoodtogo';
import { Item, ITooGoodToGoService } from '@app/toogoodtogo';
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
    @Inject(ITooGoodToGoService) public tgtgService: ITooGoodToGoService,
    public client: PrismaService,
    @Inject(ICacheService) public cache: ICacheService,
  ) {}

  //@Cron(CronExpression.EVERY_10_SECONDS)
  @Cron('* 16-23 * * 1-6')
  async process() {
    this.logger.debug('Reporting favorites');
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
          `🥨 *${fav.store.store_name} just listed ${fav.item.name}* \nBe fast and grab your bite.`,
          { picture: fav.store.cover_picture.current_url },
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
