import { Process } from '@nestjs/bull';
import { applyDecorators } from '@nestjs/common';
export interface ProcessOptions {
  name?: string;
  concurrency?: number;
}
export function MQProcess(): MethodDecorator;
export function MQProcess(name: string): MethodDecorator;
export function MQProcess(processorOptions: ProcessOptions): MethodDecorator;
export function MQProcess(
  nameOrOptions?: string | ProcessOptions,
): MethodDecorator {
  const options: ProcessOptions = (
    nameOrOptions && typeof nameOrOptions === 'object'
      ? nameOrOptions
      : { name: nameOrOptions }
  ) as ProcessOptions;
  return applyDecorators(Process(options));
}
