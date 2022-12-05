import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { PrismaModule, PrismaService } from '@app/prisma';
import { Usage } from '@prisma/client';
import Bull from 'bull';

const usageArray: Usage[] = [
  {
    date: new Date('2020-01-02'),
    id: 'abc-123',
    user_id: '123',
  },
];

const db = {
  usage: {
    findMany: jest.fn().mockResolvedValue(usageArray),
    save: jest.fn(),
  },
};

const queue = {
  add: jest.fn(),
  process: jest.fn(),
};

describe('BillingController', () => {
  let billingController: BillingController;
  let prisma: PrismaService;
  let bqueue: Bull.Queue;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [BillingService, { provide: PrismaService, useValue: db }],
    })
      .overrideProvider('monet')
      .useValue(queue)
      .compile();

    billingController = app.get<BillingController>(BillingController);
    prisma = app.get<PrismaService>(PrismaService);
  });

  it('should get all', async () => {
    const usages = await billingController.getAll();
    expect(usages).toHaveLength(1);
    expect(db.usage.findMany).toBeCalledTimes(1);
  });

  it('should add one', async () => {});
});
