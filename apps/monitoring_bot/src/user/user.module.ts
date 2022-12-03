import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
})
export class UserModule {}
