import NodeCache from "node-cache";

interface Cache {
  get: <T>(key: string) => T | undefined;
  set: (key: string, data: any) => boolean;
}

export class CacheWrapper implements Cache {
  private readonly cacheInstance: Cache;
  private static instance: CacheWrapper;

  private constructor(cache: Cache) {
    this.cacheInstance = cache;
  }

  static getInstance(cache: Cache): CacheWrapper {
    if (!CacheWrapper.instance) {
      CacheWrapper.instance = new CacheWrapper(cache);
    }
    return CacheWrapper.instance;
  }

  get<T>(key: string) {
    return this.cacheInstance.get<T>(key);
  }

  set(key: string, data: any) {
    return this.cacheInstance.set(key, data);
  }
}

export const cacheWrapper = CacheWrapper.getInstance(
  new NodeCache({ stdTTL: 86400 })
);
