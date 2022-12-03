import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(User, {
      table: 'user',
      createTableIfNotExists: true,
    }),
  ],
  providers: [UserService],
})
export class UserModule {}
