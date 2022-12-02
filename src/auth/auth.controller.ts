import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { BotService } from 'src/bot/bot.service';

@Controller('auth')
export class AuthController {
  constructor(private botService: BotService) {}

  @Get()
  @Render('login')
  async login() {
    return { message: 'Hello World!' };
  }

  @Post('callback')
  async callback(@Body() body: any, @Query() query: any) {
    console.log(body, query);
    const user = await this.botService.getUserByChatId(query.chat_id);
    console.log(user);
    this.botService.alterLoginMessage(query.chat_id, user.login_message_id);
  }
}
