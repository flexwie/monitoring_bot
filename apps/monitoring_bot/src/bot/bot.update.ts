import { InjectRepository, Repository } from '@nestjs/azure-database';
import { Logger } from '@nestjs/common';
import { Start, Ctx, Hears, Update } from 'nestjs-telegraf';
import { TemplateService } from '../template/template.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Context, Markup, Scenes } from 'telegraf';
import { BotService, UserExistsError } from './bot.service';

@Update()
export class BotUpdate {
  private readonly logger = new Logger(BotUpdate.name);

  constructor(
    public botService: BotService,
    public templateService: TemplateService,
    public userService: UserService,
    @InjectRepository(User) public userRepo: Repository<User>,
  ) {}

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
    ctx.reply(JSON.stringify(t.entries[0].name));
  }

  @Hears('/subscriptions add <name>')
  async subscriptions(@Ctx() ctx: Context) {
    console.log(ctx);
    ctx.reply('ok');
  }
}
