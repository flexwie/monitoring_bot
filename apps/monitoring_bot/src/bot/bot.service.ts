import { PrismaService } from '@app/prisma';
import { QueueClient } from '@app/queue';
import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import md from 'telegramify-markdown';

type UserInfo = {
  name: string;
  login_message_id: number;
};

@Injectable()
export class BotService {
  private map: Map<string, UserInfo> = new Map();

  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    public client: PrismaService,
    public queue: QueueClient,
  ) {}

  async registerUser(chat_id: number, name: string) {
    const userTest = await this.client.user.count({ where: { chat_id } });
    if (userTest == 1) {
      throw new UserExistsError(chat_id);
    } else if (userTest > 1) {
      throw new Error('same chat id for several users');
    }

    return await this.client.user.create({
      data: {
        chat_id,
        name,
      },
    });
  }

  async getAllUsers() {
    return this.map;
  }

  async getUserByChatId(chat_id: string) {
    return this.map.get(chat_id);
  }

  async alterLoginMessage(chat_id: string, message_id: number) {
    this.bot.telegram.editMessageReplyMarkup(chat_id, message_id, '', {
      inline_keyboard: [[{ text: 'Logged in', callback_data: '' }]],
    });
  }

  async sendMessage(
    chat_id: number,
    message: string,
    opts?: { picture?: string },
  ) {
    const user = await this.client.user.findFirst({
      where: { chat_id },
      select: { id: true },
    });

    await this.queue.reportNotification(user.id);

    if (opts?.picture) {
      await this.bot.telegram.sendPhoto(chat_id, opts.picture, {
        caption: message,
        parse_mode: 'Markdown',
      });
    } else {
      await this.bot.telegram.sendMessage(chat_id, message, {
        parse_mode: 'Markdown',
      });
    }
  }
}

export class UserExistsError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'UserExistsError'; // (2)
  }
}
