import { Markup } from 'telegraf';

export const MAIN_INLINE = Markup.inlineKeyboard([
  { text: 'Subscription', callback_data: 'sub' },
]);

export const SUB_ONB = Markup.inlineKeyboard([
  { text: '2Good2Go', callback_data: 'sub:tgtg:onb' },
  { text: 'Azure', callback_data: 'sub:azure:on' },
]);

export const buildSubOnb = (subs: string[]) =>
  Markup.inlineKeyboard([
    [
      {
        text: `${subs && subs.includes('tgtg') ? '✅ ' : ''} TooGoodToGo`,
        callback_data: 'sub:tgtg:onb',
      },
      { text: 'Azure', callback_data: 'sub:azure:onb' },
    ],
    [
      {
        text: 'Done',
        callback_data: 'sub:done',
      },
    ],
  ]);
