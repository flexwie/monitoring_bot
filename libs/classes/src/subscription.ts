import { User } from './user';
import { SubscriptionTypes } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Subscription {
  @ApiProperty({ type: String })
  id: string = undefined;

  @ApiProperty({ type: () => User })
  user: User = undefined;

  @ApiProperty({ type: Number })
  chat_id: number = undefined;

  @ApiProperty({ enum: SubscriptionTypes, enumName: 'SubscriptionTypes' })
  type: SubscriptionTypes = undefined;

  @ApiProperty({ type: Date })
  created_at: Date = undefined;
}
