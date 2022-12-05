import { TooGoodToGoService } from '@app/toogoodtogo';
import { Context, Scene, SceneEnter, Use } from 'nestjs-telegraf';
import { SubscriptionService } from '../subscription/subscription.service';
import { Scenes } from 'telegraf';
import { SubscriptionTypes } from '@prisma/client';
import { SceneSessionData } from 'telegraf/typings/scenes';
import { SessionContext } from 'telegraf/typings/session';
import { addToHistory, makeMsgHistory } from './helper';

@Scene('tgtg')
export class TgTgScene {
  constructor(
    public subService: SubscriptionService,
    public tgtgService: TooGoodToGoService,
  ) {}

  @SceneEnter()
  async step1(@Context() ctx: any) {
    makeMsgHistory(
      await ctx.reply('Please enter your TooGoodToGo email address'),
      ctx,
    );
  }

  @Use()
  async onEmailReply(
    @Context()
    ctx: Scenes.SceneContext &
      SessionContext<SceneSessionData & { subs: string[] }>,
  ) {
    await addToHistory(ctx.message.message_id, ctx);

    await makeMsgHistory(
      ctx.reply(
        'TooGoodToGo will send you an email to verify the login. Please open the link.',
      ),
      ctx,
    );

    try {
      //await this.tgtgService.login((ctx.message as any).text, ctx.chat.id);

      // this.subService.createSubscription(
      //   ctx.message.chat.id,
      //   SubscriptionTypes.TooGoodToGo,
      // );

      makeMsgHistory(ctx.reply('You are now subscribed to 2good2go!'), ctx);

      ctx.session.subs.push('tgtg');
      await ctx.scene.leave();
      await ctx.scene.enter('onboarding');
    } catch (error) {
      console.log(error);
      ctx.reply('something went wrong. please try again!');
      ctx.scene.leave();
    }
  }
}
