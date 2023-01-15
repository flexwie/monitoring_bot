import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class TgtgCredentials {
  @ApiProperty({ type: String })
  id: string = undefined;

  @ApiProperty({ type: String })
  chat_id: string = undefined;

  @ApiProperty({ type: () => User })
  user: User = undefined;

  @ApiProperty({ type: String })
  access_token: string = undefined;

  @ApiProperty({ type: String })
  refresh_token: string = undefined;

  @ApiProperty({ type: Number })
  ttl: number = undefined;

  @ApiProperty({ type: Date })
  last_login: Date = undefined;

  @ApiProperty({ type: String })
  tgtg_user_id: string = undefined;
}
