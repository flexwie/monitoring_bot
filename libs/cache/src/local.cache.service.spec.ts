import { Test, TestingModule } from '@nestjs/testing';
import { LocalCacheService } from './local.cache.service';

describe('LocalCacheService', () => {
  let service: LocalCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalCacheService],
    }).compile();

    service = module.get<LocalCacheService>(LocalCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be writeable', () => {
    service.set('test', '1');
    expect(service.has('test')).toBeTruthy();
  });

  it('should be readable', () => {
    service.set('test', '1');
    expect(service.get('test')).toBe('1');
  });
});
