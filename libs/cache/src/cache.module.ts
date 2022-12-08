import { DynamicModule, Module } from '@nestjs/common';
import { ICacheService } from './cache.type';
import { LocalCacheService } from './local.cache.service';
import { RedisCacheService } from './redis.cache.service';
import { RedisClientOptions } from 'redis';

@Module({})
export class CacheModule {
  static register(options: RedisClientOptions): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: ICacheService,
          useValue:
            process.env.NODE_ENV == 'production'
              ? new RedisCacheService(options)
              : new LocalCacheService(),
        },
      ],
      exports: [ICacheService],
    };
  }
}
