import * as Redis from 'ioredis';
import { Queue } from 'bull';
import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';
import { BullQueueProcessor } from '@nestjs/bull';
export type QueueProcessor = BullQueueProcessor;
export interface QueueRootModuleOptions {
    redis?: Redis.RedisOptions | string | undefined;
}
export interface QueueModuleOptions {
    name: string;
    configKey?: string;
    processors?: QueueProcessor[];
}
export { Queue };
export interface SharedQueueConfigurationFactory {
    createSharedConfiguration(): Promise<QueueRootModuleOptions> | QueueRootModuleOptions;
}
export interface SharedQueueAsyncConfiguration extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<SharedQueueConfigurationFactory>;
    useClass?: Type<SharedQueueConfigurationFactory>;
    useFactory?: (...args: any[]) => Promise<QueueRootModuleOptions> | QueueRootModuleOptions;
    inject?: FactoryProvider['inject'];
}
