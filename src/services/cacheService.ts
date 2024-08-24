import NodeCache from 'node-cache';

class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  set(key: string, value: any, ttl: number = 100): void {
    this.cache.set(key, value, ttl);
  }

  get(key: string): unknown {
    return this.cache.get(key);
  }

  delete(key: string): void {
    this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }
}

export default new CacheService();
