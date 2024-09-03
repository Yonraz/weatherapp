import NodeCache from "node-cache";

export class CacheWrapper {
  cacheInstance?: NodeCache;

  constructor(cache: NodeCache) {
    this.newCache(cache);
  }

  newCache(cache: NodeCache) {
    if (this.cacheInstance) {
      return;
    }
    this.cacheInstance = cache;
  }

  get<T>(key: string) {
    if (!this.cacheInstance) throw new Error("No cache instance available");
    return this.cacheInstance?.get<T>(key);
  }

  set(key: string, data: any) {
    if (!this.cacheInstance) throw new Error("No cache instance available");
    return this.cacheInstance?.set(key, data);
  }
}

export const cacheWrapper = new CacheWrapper(new NodeCache({ stdTTL: 86400 }));