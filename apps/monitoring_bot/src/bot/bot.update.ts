import { Logger } from '@nestjs/common';
import { Start, Ctx, Hears, Update } from 'nestjs-telegraf';
import { UserService } from '../user/user.service';
import { Context } from 'telegraf';
import { BotService, UserExistsError } from './bot.service';

@Update()
export class BotUpdate {
  private readonly logger = new Logger(BotUpdate.name);

  constructor(public botService: BotService, public userService: UserService) {}

  @Start()
  async start(@Ctx() ctx: Context<any>) {
    this.logger.debug(`New user ${ctx.message.from.username}`);

    try {
      await this.botService.registerUser(
        ctx.update.message.chat.id,
        ctx.update.message.from.first_name,
      );

      await ctx.reply('Hey! Nice to have you on board!');

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

  @Hears('/users')
  async hears(@Ctx() ctx: Context) {
    const users = await this.botService.getAllUsers();
    const t = await this.userService.getUserByChatId(ctx.from.id);
    ctx.reply(JSON.stringify(t.name));
  }

  @Hears('/subscriptions add <name>')
  async subscriptions(@Ctx() ctx: Context) {
    console.log(ctx);
    ctx.reply('ok');
  }
}
