import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { TooGoodToGoService } from './toogoodtogo.service';
import { UserCredentials } from './usercredentials.entity';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(UserCredentials, {
      table: 'usercredentials',
      createTableIfNotExists: true,
    }),
  ],
  providers: [TooGoodToGoService],
  exports: [TooGoodToGoService],
})
export class ToogoodtogoModule {}
