import { Processor } from '@nestjs/bull';
import { Scope, applyDecorators } from '@nestjs/common';
export interface ProcessorOptions {
  /**
   * Specifies the name of the queue to subscribe to.
   */
  name?: string;
  /**
   * Specifies the lifetime of an injected Processor.
   */
  scope?: Scope;
}
/**
 * Represents a worker that is able to process jobs from the queue.
 */
export function MQProcessor(): ClassDecorator;
/**
 * Represents a worker that is able to process jobs from the queue.
 * @param queueName queue name
 */
export function MQProcessor(queueName: string): ClassDecorator;
/**
 * Represents a worker that is able to process jobs from the queue.
 * @param processorOptions processor options
 */
export function MQProcessor(processorOptions: ProcessorOptions): ClassDecorator;
export function MQProcessor(
  queueNameOrOptions?: string | ProcessorOptions,
): ClassDecorator {
  const options: ProcessorOptions = (
    queueNameOrOptions && typeof queueNameOrOptions === 'object'
      ? queueNameOrOptions
      : { name: queueNameOrOptions }
  ) as ProcessorOptions;
  return applyDecorators(Processor(options));
}
