import { Logger } from '@nestjs/common';
import { Start, Ctx, Hears, Update, Action } from 'nestjs-telegraf';
import { UserService } from '../user/user.service';
import { Context, Markup } from 'telegraf';
import { BotService, UserExistsError } from './bot.service';
import { makeMsgHistory } from './helper';

@Update()
export class BotUpdate {
  private readonly logger = new Logger(BotUpdate.name);

  constructor(public botService: BotService, public userService: UserService) {}

  @Start()
  async start(@Ctx() ctx: Context<any>) {
    try {
      await this.botService.registerUser(
        ctx.update.message.chat.id,
        ctx.update.message.from.first_name,
      );

      this.logger.debug(`New user ${ctx.message.from.username}`);

      await makeMsgHistory(ctx.reply('Hey! Nice to have you on board!'), ctx);

      await (ctx as any).scene.enter('onboarding');
    } catch (e) {
      if (e instanceof UserExistsError) {
        ctx.reply('You already registered!');
        return;
      }

      this.logger.error(e, e.stack);
      ctx.reply("Hmm, that didn't work... Please try again!");
    }
  }

  @Hears('/subscription')
  async add(@Ctx() ctx: Context) {
    ctx.reply(
      'ok!',
      Markup.inlineKeyboard([
        { text: 'Open app', web_app: { url: 'http://localhost:3002/tg' } },
      ]),
    );
    //ctx.reply(
    //'This command is not implemented yet... It will be in the near future',
    //);
  }

  @Hears('/list')
  async list(@Ctx() ctx: Context) {
    const result = await this.userService.getSubscriptionsByChatId(ctx.from.id);
    const text = result.Subscription.map(
      (s) => s.type + '; created at ' + s.created_at.toDateString(),
    );
    ctx.reply(`Your subscriptions:\n${text.join('\n')}`);
  }

  @Hears('/app')
  async showApp(@Ctx() ctx: Context) {
    await ctx.reply(
      'ok!',
      Markup.inlineKeyboard([
        { text: 'Open app', web_app: { url: 'http://localhost:3002/tg' } },
      ]),
    );
  }
}
