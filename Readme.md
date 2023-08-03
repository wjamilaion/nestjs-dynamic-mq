# NestJS Dynamic Queue Module (based on Bull)

[![npm version](https://badge.fury.io/js/nestjs-dynamic-mq.svg)](https://badge.fury.io/js/nestjs-dynamic-queue)

## Description

The NestJS Dynamic Queue Module is a powerful and flexible NestJS module for managing job queues using Bull. It allows you to integrate asynchronous task processing into your NestJS applications with support for both Redis and RabbitMQ backends. With dynamic configuration options, you can seamlessly switch between Redis and RabbitMQ for queue management based on your specific requirements. Simplify your task processing workflows and enhance the scalability of your microservices with NestJS Bull Queue Module.

## Installation

```bash
npm install nestjs-dynamic-queue
```

## Usage

1. Create your Queue Processor class (e.g., queue.processor.ts):
``` typescript
import { MQProcessor, MQProcess } from 'nestjs-dynamic-queue'; // Import your custom decorators
import { Logger } from '@nestjs/common';

@MQProcessor('my_queue')
export class QueueProcessor {
  private readonly queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  @MQProcess('job_name')
  handleJob(job: any) {
    // Process the job here
  }
}

```

2. Import the MessageQueueModule and custom decorators in your NestJS application's module:

``` typescript
import { Module } from '@nestjs/common';
import { MessageQueueModule, MessageQueueModuleOptions } from 'nestjs-dynamic-queue';
import { MQProcessor, MQProcess } from 'nestjs-dynamic-queue'; // Import your custom decorators
import { QueueProcessor } from './queue.processor'; // Import your Queue Processor class

@Module({
  imports: [
    MessageQueueModule.register({
      backend: 'redis', // 'redis' or 'rabbitmq'
      queueName: 'my_queue', // Replace 'my_queue' with your desired queue name
      redisConfig: {
        host: 'localhost',
        port: 6379,
      },
      // Or use 'rabbitmq' as backend with rabbitmqConfig if you want to use RabbitMQ
      // rabbitmqConfig: {
      //   uri: 'amqp://guest:guest@localhost:5672/',
      //   exchanges: [
      //     {
      //       name: 'amq.topic',
      //       type: 'topic',
      //     },
      //   ],
      // },
      processors: [QueueProcessor], // Add other processors as needed
    }),
  ],
})
export class AppModule {}

```

That's it! Your NestJS application is now ready to handle jobs in the queue using Bull with custom decorators.


## Configuration Options
* backend: Specify the backend for the queue. Supported values: 'redis' or 'rabbitmq'.
* queueName: The name of the queue.
* redisConfig: (Required if backend is 'redis') Specify the Redis server configuration.
* rabbitmqConfig: (Required if backend is 'rabbitmq') Specify the RabbitMQ server configuration.
* processors: An array of Queue Processor classes that handle the jobs in the queue.