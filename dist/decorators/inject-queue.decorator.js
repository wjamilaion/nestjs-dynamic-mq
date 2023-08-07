"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMQueue = void 0;
const bull_1 = require("@nestjs/bull");
const InjectMQueue = (name) => (0, bull_1.InjectQueue)(name);
exports.InjectMQueue = InjectMQueue;
