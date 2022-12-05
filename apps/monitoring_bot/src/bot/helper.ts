import { Context, Middleware, MiddlewareFn } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { SessionContext } from 'telegraf/typings/session';

export const makeMsgHistory = async (
  msg: Promise<Message>,
  ctx: SessionContext<any>,
) => {
  if (ctx.session) {
    if (!ctx.session.msg) {
      ctx.session.msg = [];
    }

    const resolvedMsg = await msg;

    ctx.session.msg.push(resolvedMsg.message_id);
  }
};

export const addToHistory = async (id: number, ctx: SessionContext<any>) => {
  if (ctx.session) {
    if (!ctx.session.msg) {
      ctx.session.msg = [];
    }

    ctx.session.msg.push(id);
  }
};

export const delHistory = async (ctx: SessionContext<any>) => {
  if (!ctx.session.msg) return;

  for (let i = 0; i < ctx.session.msg.length; i++) {
    const id = ctx.session.msg[i];
    await ctx.deleteMessage(id);
  }

  ctx.session.msg = [];
};
