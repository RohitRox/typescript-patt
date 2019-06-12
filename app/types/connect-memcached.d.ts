import { RequestHandler } from 'express';
import { SessionOptions } from 'express-session';

declare function connectMemcached(session: (options?: SessionOptions) => RequestHandler): any;

declare namespace connectMemcached {
  export interface MemcachedStoreConfig {
    hosts: string[];
  }

  export interface MemcachedStoreInstance {}

  export interface MemcachedStoreClass {
    new (config: MemcachedStoreConfig): MemcachedStoreInstance;
  }
}

export = connectMemcached;
