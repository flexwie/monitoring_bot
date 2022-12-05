import { Subscription } from './subscription';
import { TgtgCredentials } from './tgtg_credentials';
import { Usage } from './usage';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;

  @ApiProperty({ type: Number })
  chat_id: number = undefined;

  @ApiProperty({ type: Date })
  created_at: Date = undefined;

  @ApiProperty({ isArray: true, type: () => Subscription })
  Subscription: Subscription[] = undefined;

  @ApiProperty({ isArray: true, type: () => TgtgCredentials })
  TgtgCredentials: TgtgCredentials[] = undefined;

  @ApiProperty({ isArray: true, type: () => Usage })
  Usage: Usage[] = undefined;
}
