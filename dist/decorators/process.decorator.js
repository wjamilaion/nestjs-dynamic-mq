"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQProcess = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
function MQProcess(nameOrOptions) {
    const options = (nameOrOptions && typeof nameOrOptions === 'object'
        ? nameOrOptions
        : { name: nameOrOptions });
    return (0, common_1.applyDecorators)((0, bull_1.Process)(options));
}
exports.MQProcess = MQProcess;
