import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheService } from './redis.cache.service';
import { CacheModule } from './cache.module';

jest.mock('redis', jest.fn());

describe('RedisCacheService', () => {
  let service: RedisCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      providers: [RedisCacheService],
    }).compile();

    service = module.get<RedisCacheService>(RedisCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be writeable', () => {
    service.set('test', '1');
    // expect(service.has('test')).toBeTruthy();
  });

  it('should be readable', () => {
    service.set('test', '1');
    expect(service.get('test')).toBe('1');
  });
});
