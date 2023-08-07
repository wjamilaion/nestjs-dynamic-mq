import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import {
  QueueModuleOptions,
  QueueRootModuleOptions,
  SharedQueueAsyncConfiguration,
  SharedQueueConfigurationFactory,
} from '.';
import { getSharedConfigToken } from './utils/get-shared-config-token.util';

@Module({})
export class MQModule {
  static forRoot(option: QueueRootModuleOptions): DynamicModule {
    const { redis } = option;

    return {
      module: MQModule,
      imports: [
        BullModule.forRoot({
          redis: redis,
        }),
      ],
    };
  }
  /**
   * Registers a globally available configuration for all queues.
   *
   * @param asyncQueueConfig shared queue configuration async factory
   */
  static forRootAsync(
    asyncQueueConfig: SharedQueueAsyncConfiguration,
  ): DynamicModule;
  /**
   * Registers a globally available configuration under a specified "configKey".
   *
   * @param configKey a key under which the configuration should be available
   * @param asyncQueueConfig shared bull configuration async factory
   */
  static forRootAsync(
    configKey: string,
    asyncQueueConfig: SharedQueueAsyncConfiguration,
  ): DynamicModule;
  /**
   * Registers a globally available configuration for all queues
   * or using a specified "configKey" (if passed).
   *
   * @param keyOrAsyncConfig a key under which the configuration should be available or a bull configuration object
   * @param asyncBullConfig shared bull configuration async factory
   */
  static forRootAsync(
    keyOrAsyncConfig: string | SharedQueueAsyncConfiguration,
    asyncBullConfig?: SharedQueueAsyncConfiguration,
  ): DynamicModule {
    const [configKey, asyncSharedBullConfig] =
      typeof keyOrAsyncConfig === 'string'
        ? [keyOrAsyncConfig, asyncBullConfig]
        : [undefined, keyOrAsyncConfig];

    const providers = this.createAsyncSharedConfigurationProviders(
      configKey,
      asyncSharedBullConfig,
    );

    return {
      global: true,
      module: MQModule,
      imports: asyncSharedBullConfig.imports,
      providers: providers,
      exports: providers,
    };
  }
  private static createAsyncSharedConfigurationProviders(
    configKey: string | undefined,
    options: SharedQueueAsyncConfiguration,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncSharedConfigurationProvider(configKey, options)];
    }
    const useClass = options.useClass as Type<SharedQueueConfigurationFactory>;
    return [
      this.createAsyncSharedConfigurationProvider(configKey, options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }
  private static createAsyncSharedConfigurationProvider(
    configKey: string | undefined,
    options: SharedQueueAsyncConfiguration,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: getSharedConfigToken(configKey),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    // `as Type<SharedBullConfigurationFactory>` is a workaround for microsoft/TypeScript#31603
    const inject = [
      (options.useClass ||
        options.useExisting) as Type<SharedQueueConfigurationFactory>,
    ];
    return {
      provide: getSharedConfigToken(configKey),
      useFactory: async (optionsFactory: SharedQueueConfigurationFactory) =>
        optionsFactory.createSharedConfiguration(),
      inject,
    };
  }

  static registerQueue(...options: QueueModuleOptions[]): DynamicModule {
    const queues = options.map(x => ({
      name: x.name,
    }));
    return {
      module: MQModule,
      imports: [BullModule.registerQueue(...queues)],
    };
  }
}
