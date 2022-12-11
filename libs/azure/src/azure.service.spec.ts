import { Test, TestingModule } from '@nestjs/testing';
import { AzureService } from './azure.service';

describe('AzureService', () => {
  let service: AzureService;
  const subscriptionId = '2842a7fd-f853-4457-a036-b0d5553bf4fd';
  jest.setTimeout(10000);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureService],
    }).compile();

    service = await module.resolve<AzureService>(AzureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should acquire token', async () => {
    const token = await service.acquireToken(subscriptionId);
    expect(token.length).toBeGreaterThan(0);
  });

  it('should list insights', async () => {});
});
