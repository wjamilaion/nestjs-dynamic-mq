"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQProcess = exports.MQProcessor = void 0;
const common_1 = require("@nestjs/common");
const MQProcessor = (name) => (0, common_1.SetMetadata)('queueName', name);
exports.MQProcessor = MQProcessor;
const MQProcess = (name) => (0, common_1.SetMetadata)('jobName', name);
exports.MQProcess = MQProcess;
