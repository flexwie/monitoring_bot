import { Context, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';

@Wizard('onboarding')
export class OnboardingScene {
  constructor() {}

  @WizardStep(1)
  step1(@Context() ctx: Scenes.WizardContext) {
    ctx.reply(
      'wich topic do you want to subscribe?',
      Markup.keyboard(['/2good2go', '/azure']).oneTime().resize(),
    );
    ctx.wizard.next();
  }

  @WizardStep(2)
  async step2(@Context() ctx: any) {
    await ctx.scene.leave();

    if (ctx.update.message.text == '/2good2go') {
      await ctx.scene.enter('tgtg');
    }
  }
}
