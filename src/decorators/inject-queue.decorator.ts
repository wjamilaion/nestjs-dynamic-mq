import { InjectQueue } from '@nestjs/bull';

/**
 * Injects MQ's queue instance with the given name
 * @param name queue name
 */
export const InjectMQueue = (name?: string) => InjectQueue(name);
