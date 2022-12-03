import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(public client: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    return this.client.user.findUniqueOrThrow({ where: { id } });
  }

  async getUserByChatId(chat_id: number) {
    return this.client.user.findUniqueOrThrow({ where: { chat_id } });
  }

  async createUser(user: User): Promise<User> {
    return this.client.user.create({ data: user });
  }
}
