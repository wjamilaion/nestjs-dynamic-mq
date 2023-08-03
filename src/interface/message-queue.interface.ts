// Interface for Redis configuration
export interface RedisConfig {
  host: string;
  port: number;
}

// Interface for RabbitMQ configuration
export interface RabbitMQConfig {
  uri: string;
  exchanges: { name: string; type: string }[];
}

// Interface for defining Queue Processor classes
// export type QueueProcessorClass = string | BullQueueProcessorCallback | BullQueueAdvancedProcessor | BullQueueSeparateProcessor | BullQueueAdvancedSeparateProcessor;;
// Interface for defining Queue Processor classes
export interface QueueProcessorClass {
  new (...args: any[]): any;
}
// Interface for Bull Queue Module configuration options
export interface MessageQueueModuleOptions {
  backend: 'redis' | 'rabbitmq';
  queueName: string;
  redisConfig?: RedisConfig;
  rabbitmqConfig?: RabbitMQConfig;
  processors: QueueProcessorClass[];
}
