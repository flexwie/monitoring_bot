export interface ICacheService {
  get(key: string): Promise<string>;
  set(key: string, value: string, opts?: CacheOpts): void;
}

export type CacheOpts = {
  ttl?: number;
};

export const ICacheService = Symbol('ICacheService');
