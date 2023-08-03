import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import {
  MessageQueueModuleOptions,
  RedisConfig,
  RabbitMQConfig,
  QueueProcessorClass,
} from './interface/message-queue.interface';

@Module({})
export class MessageQueueModule {
  static register(options: MessageQueueModuleOptions): DynamicModule {
    const { backend, queueName, redisConfig, rabbitmqConfig, processors } =
      options;
    let providers: Provider[] = [];

    switch (backend) {
      case 'redis':
        providers = [
          {
            provide: 'QUEUE_BACKEND',
            useValue: 'redis',
          },
          {
            provide: 'QUEUE_CONFIG',
            useValue: redisConfig,
          },
        ];
        break;

      case 'rabbitmq':
        providers = [
          {
            provide: 'QUEUE_BACKEND',
            useValue: 'rabbitmq',
          },
          {
            provide: 'QUEUE_CONFIG',
            useValue: rabbitmqConfig,
          },
        ];
        break;
    }

    const queueProcessorsProviders = processors.map((processor, index) => ({
      provide: `QUEUE_PROCESSOR_${index}`,
      useClass: processor,
    }));

    return {
      module: MessageQueueModule,
      imports: [
        BullModule.registerQueueAsync({
          name: queueName,
          useFactory: async (
            backend: string,
            config: RedisConfig | RabbitMQConfig,
          ) => {
            switch (backend) {
              default:
              case 'redis':
                return {
                  redis: { ...(config as RedisConfig) },
                  // processors: [...processors]
                };
              case 'rabbitmq':
                return {
                  // processors: [...processors],
                  options: { ...(config as RabbitMQConfig) },
                };
            }
          },
          inject: ['QUEUE_BACKEND', 'QUEUE_CONFIG'],
        }),
      ],
      providers: [
        ...providers,
        ...queueProcessorsProviders,
        ...this.createProcessorsMetadata(processors),
        { provide: 'QUEUE_NAME', useValue: options.queueName }, // Add this line to provide the queue name
      ],
      exports: [
        ...providers,
        ...queueProcessorsProviders,
        ...this.createProcessorsMetadata(processors),
        'QUEUE_NAME',
      ],
    };
  }

  private static createProcessorsMetadata(
    processors: QueueProcessorClass[],
  ): Provider[] {
    return processors.map((processor, index) => ({
      provide: processor,
      useFactory: (queueName: string) => new processor(queueName),
      inject: ['QUEUE_NAME'],
    }));
  }
}
