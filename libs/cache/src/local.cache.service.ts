import { Injectable } from '@nestjs/common';
import { ICacheService } from './cache.type';

@Injectable()
export class LocalCacheService extends Map implements ICacheService {}
