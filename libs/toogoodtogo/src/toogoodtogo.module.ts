import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { TooGoodToGoService } from './toogoodtogo.service';

@Module({
  imports: [PrismaModule],
  providers: [TooGoodToGoService],
  exports: [TooGoodToGoService],
})
export class ToogoodtogoModule {}
