import { InjectRepository, Repository } from '@nestjs/azure-database';
import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { User } from 'src/user/user.entity';
import { Telegraf, Context, Markup } from 'telegraf';

type UserInfo = {
  name: string;
  login_message_id: number;
};

@Injectable()
export class BotService {
  private map: Map<string, UserInfo> = new Map();

  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    @InjectRepository(User) public userRepo: Repository<User>,
  ) {}

  async registerUser(chat_id: number, name: string) {
    const userTest = await this.userRepo
      .where('chat_id eq ?', chat_id)
      .findAll();
    if (userTest.entries.length == 1) {
      throw new UserExistsError(chat_id);
    } else if (userTest.entries.length > 1) {
      throw new Error('same chat id for several users');
    }

    const user = new User();
    user.chat_id = chat_id;
    user.name = name;
    user.created_at = new Date();

    return await this.userRepo.create(user);
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

  async sendMessage(chat_id: number, message: string) {
    await this.bot.telegram.sendMessage(chat_id, message);
  }
}

export class UserExistsError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = 'UserExistsError'; // (2)
  }
}
