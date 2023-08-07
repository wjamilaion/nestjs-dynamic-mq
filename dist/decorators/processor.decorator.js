"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
function MQProcessor(queueNameOrOptions) {
    const options = (queueNameOrOptions && typeof queueNameOrOptions === 'object'
        ? queueNameOrOptions
        : { name: queueNameOrOptions });
    return (0, common_1.applyDecorators)((0, bull_1.Processor)(options));
}
exports.MQProcessor = MQProcessor;
