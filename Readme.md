# NestJS Dynamic Queue Module (based on Bull)

[![npm version](https://badge.fury.io/js/nestjs-dynamic-mq.svg)](https://badge.fury.io/js/nestjs-dynamic-mq)

## Description

The NestJS Dynamic Queue Module is a powerful and flexible NestJS module for managing job queues using Bull. It allows you to integrate asynchronous task processing into your NestJS applications with support for both Redis and RabbitMQ backends. With dynamic configuration options, you can seamlessly switch between Redis and RabbitMQ for queue management based on your specific requirements. Simplify your task processing workflows and enhance the scalability of your microservices with NestJS Bull Queue Module.

## Installation

```bash
npm install nestjs-dynamic-mq
```

## Usage

1. Create your Queue Processor class (e.g., queue.processor.ts):
``` typescript
import { MQProcessor, MQProcess } from 'nestjs-dynamic-mq'; // Import your custom decorators
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

2. Import the MQModule and custom decorators in your NestJS application's module:

``` typescript
import { Module } from '@nestjs/common';
import { MQModule } from 'nestjs-dynamic-mq';
import { QueueProcessor } from './queue.processor'; // Import your Queue Processor class

@Module({
  imports: [
    MQModule.registerQueue({
      name: 'bulk-transfer',
    }),
    MQModule.forRoot({
          redis: {
          host: 'localhost',
          port: 6379,
        }
      }
    ),
  ],
})
export class MQModule {}

```

That's it! Your NestJS application is now ready to handle jobs in the queue using Bull with custom decorators.
