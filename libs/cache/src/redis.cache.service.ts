import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CacheOpts, ICacheService } from './cache.type';
import { createClient, RedisClientType, RedisClientOptions } from 'redis';

@Injectable()
export class RedisCacheService implements ICacheService, OnModuleInit {
  private _client: RedisClientType;
  private logger = new Logger(RedisCacheService.name);

  constructor(opts: RedisClientOptions) {
    (this._client as any) = createClient(opts);

    this._client.on('error', (err) =>
      this.logger.error(`Redis Cache Error: ${err}`),
    );
  }

  async onModuleInit() {
    await this._client.connect();
  }

  get(key: string): Promise<string> {
    return this._client.get(key);
  }
  set(key: string, value: string, opts?: CacheOpts): void {
    this._client.set('EX', key, value, opts?.ttl ? opts.ttl : 60 * 60 * 24);
  }
}
