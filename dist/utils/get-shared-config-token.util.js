"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedConfigToken = exports.QUEUE_CONFIG_DEFAULT_TOKEN = void 0;
exports.QUEUE_CONFIG_DEFAULT_TOKEN = 'QUEUE_CONFIG(default)';
function getSharedConfigToken(configKey) {
    return configKey ? `QUEUE_CONFIG(${configKey})` : exports.QUEUE_CONFIG_DEFAULT_TOKEN;
}
exports.getSharedConfigToken = getSharedConfigToken;
