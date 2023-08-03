import { MessageQueueModule, MessageQueueModuleOptions } from '../src';
import { MQProcessor, MQProcess } from '../src/'; // Import your custom decorators

@MQProcessor('my_queue')
class QueueMQProcessor {
  private readonly queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  @MQProcess('job_name')
  handleJob(job: any) {
    // MQProcess the job here
  }
}

describe('MessageQueueModule', () => {
  it('should be defined', () => {
    const options: MessageQueueModuleOptions = {
      backend: 'redis',
      queueName: 'my_queue',
      redisConfig: {
        host: 'localhost',
        port: 6379,
      },
      processors: [QueueMQProcessor],
    };
    const module = MessageQueueModule.register(options);
    expect(module).toBeDefined();
  });

  it('should use redis backend and configuration', () => {
    const options: MessageQueueModuleOptions = {
      backend: 'redis',
      queueName: 'my_queue',
      redisConfig: {
        host: 'localhost',
        port: 6379,
      },
      processors: [QueueMQProcessor],
    };
    const module = MessageQueueModule.register(options);

    expect(module.imports).toHaveLength(1);
    expect(module.providers).toHaveLength(5); // Updated count to 5 to account for custom decorators
    expect(module.exports).toHaveLength(5); // Updated count to 5 to account for custom decorators
  });

  it('should use rabbitmq backend and configuration', () => {
    const options: MessageQueueModuleOptions = {
      backend: 'rabbitmq',
      queueName: 'my_queue',
      rabbitmqConfig: {
        uri: 'amqp://guest:guest@localhost:5672/',
        exchanges: [
          {
            name: 'amq.topic',
            type: 'topic',
          },
        ],
      },
      processors: [QueueMQProcessor],
    };
    const module = MessageQueueModule.register(options);

    expect(module.imports).toHaveLength(1);
    expect(module.providers).toHaveLength(5); // Updated count for custom decorators
    expect(module.exports).toHaveLength(5); // Updated count for custom decorators
  });
});
