export const QUEUE_CONFIG_DEFAULT_TOKEN = 'QUEUE_CONFIG(default)';

export function getSharedConfigToken(configKey?: string): string {
  return configKey ? `QUEUE_CONFIG(${configKey})` : QUEUE_CONFIG_DEFAULT_TOKEN;
}
