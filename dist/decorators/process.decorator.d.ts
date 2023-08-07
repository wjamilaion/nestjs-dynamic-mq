export interface ProcessOptions {
    name?: string;
    concurrency?: number;
}
export declare function MQProcess(): MethodDecorator;
export declare function MQProcess(name: string): MethodDecorator;
export declare function MQProcess(processorOptions: ProcessOptions): MethodDecorator;
