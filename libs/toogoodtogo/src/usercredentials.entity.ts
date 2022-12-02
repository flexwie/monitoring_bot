import {
  EntityDateTime,
  EntityInt32,
  EntityInt64,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';

@EntityPartitionKey('UserCredentialID')
@EntityRowKey('UserCredentialType')
export class UserCredentials {
  @EntityInt64() chat_id: number;
  @EntityString() access_token: string;
  @EntityString() refresh_token: string;
  @EntityInt32() ttl: number;
  @EntityDateTime() last_login: Date;
  @EntityString() tgtg_user_id: string;
}
