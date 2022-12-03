import { TooGoodToGoService } from '@app/toogoodtogo';
import { Inject } from '@nestjs/common';
import { Context, Wizard, WizardStep } from 'nestjs-telegraf';
import { SubscriptionService } from '../subscription/subscription.service';
import { SubscriptionTypes } from '../subscription/subscription.types';
import { Markup, Scenes } from 'telegraf';

@Wizard('tgtg')
export class TgTgScene {
  constructor(
    public subService: SubscriptionService,
    public tgtgService: TooGoodToGoService,
  ) {}

  @WizardStep(1)
  async step1(@Context() ctx: any) {
    ctx.reply('Please enter your TooGoodToGo email address');
    ctx.wizard.next();
  }

  @WizardStep(2)
  async step2(@Context() ctx: Scenes.WizardContext) {
    ctx.reply(
      'TooGoodToGo will send you an email to verify the login. Please open the link.',
    );

    try {
      await this.tgtgService.login((ctx.message as any).text, ctx.chat.id);

      ctx.reply('You are successfully logged in!');
      ctx.wizard.next();
    } catch (error) {
      console.log(error);
      ctx.reply('something went wrong. please try again!');
      ctx.scene.leave();
    }
  }

  @WizardStep(3)
  async step3(@Context() ctx: any) {
    this.subService.createSubscription(
      ctx.message.chat.id,
      SubscriptionTypes.TOOGOODTOGO,
    );

    ctx.reply('You are now subscribed to 2good2go!');

    ctx.scene.leave();
  }
}
