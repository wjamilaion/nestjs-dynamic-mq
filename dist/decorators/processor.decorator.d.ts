import { Scope } from '@nestjs/common';
export interface ProcessorOptions {
    name?: string;
    scope?: Scope;
}
export declare function MQProcessor(): ClassDecorator;
export declare function MQProcessor(queueName: string): ClassDecorator;
export declare function MQProcessor(processorOptions: ProcessorOptions): ClassDecorator;
