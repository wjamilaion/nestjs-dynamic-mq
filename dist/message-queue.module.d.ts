import { DynamicModule } from '@nestjs/common';
import { QueueModuleOptions, QueueRootModuleOptions, SharedQueueAsyncConfiguration } from '.';
export declare class MQModule {
    static forRoot(option: QueueRootModuleOptions): DynamicModule;
    static forRootAsync(asyncQueueConfig: SharedQueueAsyncConfiguration): DynamicModule;
    static forRootAsync(configKey: string, asyncQueueConfig: SharedQueueAsyncConfiguration): DynamicModule;
    private static createAsyncSharedConfigurationProviders;
    private static createAsyncSharedConfigurationProvider;
    static registerQueue(...options: QueueModuleOptions[]): DynamicModule;
}
