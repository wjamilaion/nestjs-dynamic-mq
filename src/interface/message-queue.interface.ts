import * as Redis from 'ioredis';
import { Queue } from 'bull';
import { FactoryProvider, ModuleMetadata, Provider, Type } from '@nestjs/common';
// import { BullQueueProcessor } from '@nestjs/bull';

export type QueueProcessor  = Provider;

export interface QueueRootModuleOptions {
  redis?: Redis.RedisOptions | string | undefined;
}
export interface QueueModuleOptions {
  name: string;
    /**
   * Shared configuration key
   *
   * @default default
   */
    configKey?: string;

    /**
     * Additional queue processors
     */
    processors: QueueProcessor[];
}

export { Queue };

export interface SharedQueueConfigurationFactory {
  createSharedConfiguration():
    | Promise<QueueRootModuleOptions>
    | QueueRootModuleOptions;
}

export interface SharedQueueAsyncConfiguration
  extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Existing Provider to be used.
   */
  useExisting?: Type<SharedQueueConfigurationFactory>;
  /**
   * Type (class name) of provider (instance to be registered and injected).
   */
  useClass?: Type<SharedQueueConfigurationFactory>;
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<QueueRootModuleOptions> | QueueRootModuleOptions;
  /**
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: FactoryProvider['inject'];
}
