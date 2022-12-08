import { PrismaModule } from '@app/prisma';
import { TooGoodToGoTestService } from './toogoodtogo.test.service';
import { Module } from '@nestjs/common';
import { TooGoodToGoService } from './toogoodtogo.service';
import { ITooGoodToGoService } from './type';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ITooGoodToGoService,
      useClass:
        process.env.NODE_ENV == 'production'
          ? TooGoodToGoService
          : TooGoodToGoTestService,
    },
  ],
  exports: [ITooGoodToGoService],
})
export class ToogoodtogoModule {}
