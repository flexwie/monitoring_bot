import {
  EntityDateTime,
  EntityInt64,
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';
import { SubscriptionTypes } from './subscription.types';

@EntityPartitionKey('SubscriptionId')
@EntityRowKey('SubscriptionType')
export class Subscription {
  @EntityString() user_id: string;
  @EntityInt64() chat_id: number;
  @EntityString() type: string;
  @EntityDateTime() created_at: Date;
}
