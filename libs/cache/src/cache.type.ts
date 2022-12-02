export interface ICacheService {
  get(key: string): Promise<string>;
  set(key: string, value: string): void;
}

export const ICacheService = Symbol('ICacheService');
