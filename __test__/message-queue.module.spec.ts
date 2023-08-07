import { MQModule, QueueRootModuleOptions } from '../src';

describe('MQModule', () => {
  it('should be defined', () => {
    const options: QueueRootModuleOptions = {
      redis: {
        host: 'localhost',
        port: 6379,
      },
    };
    const module = MQModule.forRoot(options);
    expect(module).toBeDefined();
  });
});
