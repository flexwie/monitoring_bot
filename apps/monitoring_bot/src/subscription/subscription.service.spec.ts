import { CacheModule, ICacheService } from '@app/cache';
import { PrismaService } from '@app/prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from '../subscription/subscription.service';
import { createMock } from '@golevelup/ts-jest';
import { PrismaModel } from '@app/classes';

const cache: ICacheService = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionService],
      exports: [SubscriptionService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return createMock<PrismaService>({
            subscription: {
              findFirstOrThrow: () => new PrismaModel.Subscription(),
            },
          });
        }

        if (token.toString() === ICacheService.toString()) {
          return createMock<ICacheService>();
        }
      })
      .compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find Azure Subscription', () => {
    expect(service.getAzureSubscription('1')).toBeDefined();
  });
});
