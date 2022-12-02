import { Test, TestingModule } from '@nestjs/testing';
import { ToogoodtogoService } from './toogoodtogo.service';

describe('ToogoodtogoService', () => {
  let service: ToogoodtogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToogoodtogoService],
    }).compile();

    service = module.get<ToogoodtogoService>(ToogoodtogoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
