import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class Subscription {
  @ApiProperty({ type: String })
  id: string = undefined;

  @ApiProperty({ type: () => User })
  user: User = undefined;

  @ApiProperty({ type: String })
  chat_id: string = undefined;

  @ApiProperty({ type: String })
  type: string = undefined;

  @ApiProperty({ type: Date })
  created_at: Date = undefined;
}
