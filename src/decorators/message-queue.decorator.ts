import { SetMetadata } from '@nestjs/common';

// Custom decorator to mark a method as a Bull job processor
export const MQProcessor = (name: string) => SetMetadata('queueName', name);

// Custom decorator to mark a method as the process for a specific job
export const MQProcess = (name: string) => SetMetadata('jobName', name);
