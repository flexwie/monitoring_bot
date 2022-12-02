import {
  EntityDateTime,
  EntityInt64,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('UserID')
@EntityRowKey('UserName')
export class User {
  @EntityString() name: string;
  @EntityString() mail: string;
  @EntityInt64() chat_id: number;
  @EntityDateTime() created_at: Date;
}
