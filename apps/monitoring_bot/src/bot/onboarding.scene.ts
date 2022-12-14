import { Action, Context, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';
import { SceneSessionData } from 'telegraf/typings/scenes';
import { SessionContext } from 'telegraf/typings/session';
import { delHistory, makeMsgHistory } from './helper';
import { buildSubOnb, SUB_ONB } from './keyboards';

@Wizard('onboarding')
export class OnboardingScene {
  constructor() {}

  @WizardStep(1)
  async step1(
    @Context()
    ctx: CustomContext<
      SceneSessionData & { subs?: string[] },
      Scenes.WizardContext
    >,
  ) {
    if (!ctx.session.subs) {
      ctx.session.subs = [];
    }

    makeMsgHistory(
      ctx.reply(
        'Which topic do you want to subscribe? You can subscribe to several topics, select "Done" once you are finished.',
        buildSubOnb(ctx.session.subs),
      ),
      ctx,
    );
  }

  @Action('sub:tgtg:onb')
  async wizAct(@Context() ctx: any) {
    if (ctx.session.subs && ctx.session.subs.includes('tgtg')) {
      makeMsgHistory(
        ctx.reply('You are already subscribed to TooGoodToGo!'),
        ctx,
      );
      return ctx.wizard.step(1);
    }

    await ctx.scene.leave();
    await ctx.scene.enter('tgtg');
  }

  @Action('sub:azure:onb')
  async onbAzure(@Context() ctx: Scenes.WizardContext) {
    makeMsgHistory(ctx.reply('This command is not implemented yet.'), ctx);
    return await ctx.wizard.selectStep(1);
  }

  @Action('sub:done')
  async exit(@Context() ctx: Scenes.SceneContext) {
    ctx.reply(
      'Alrighty! If you want to repeat the setup or add subscriptions, just type /subscription',
    );

    delHistory(ctx);

    ctx.scene.leave();
  }
}

export type CustomContext<T extends object, D> = SessionContext<T> & D;
