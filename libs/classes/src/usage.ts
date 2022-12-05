import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class Usage {
  @ApiProperty({ type: String })
  id: string = undefined;

  @ApiProperty({ type: String })
  user_id: string = undefined;

  @ApiProperty({ type: () => User })
  user: User = undefined;

  @ApiProperty({ type: Date })
  date: Date = undefined;
}
