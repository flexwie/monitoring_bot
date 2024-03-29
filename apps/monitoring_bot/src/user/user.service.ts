import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(public client: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    return this.client.user.findUniqueOrThrow({ where: { id } });
  }

  async getUserByChatId(chat_id: string) {
    return this.client.user.findUniqueOrThrow({ where: { chat_id } });
  }

  async createUser(user: User): Promise<User> {
    return this.client.user.create({ data: user });
  }

  async getSubscriptionsByChatId(chat_id: string) {
    return this.client.user.findFirstOrThrow({
      where: { chat_id },
      select: { Subscription: true },
    });
  }

  async removeUserById(chat_id: string) {
    return this.client.user.delete({ where: { chat_id } });
  }
}
