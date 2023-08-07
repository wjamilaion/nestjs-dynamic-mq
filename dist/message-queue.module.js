"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MQModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const get_shared_config_token_util_1 = require("./utils/get-shared-config-token.util");
let MQModule = exports.MQModule = MQModule_1 = class MQModule {
    static forRoot(option) {
        const { redis } = option;
        return {
            module: MQModule_1,
            imports: [
                bull_1.BullModule.forRoot({
                    redis: redis,
                }),
            ],
        };
    }
    static forRootAsync(keyOrAsyncConfig, asyncBullConfig) {
        const [configKey, asyncSharedBullConfig] = typeof keyOrAsyncConfig === 'string'
            ? [keyOrAsyncConfig, asyncBullConfig]
            : [undefined, keyOrAsyncConfig];
        const providers = this.createAsyncSharedConfigurationProviders(configKey, asyncSharedBullConfig);
        return {
            global: true,
            module: MQModule_1,
            imports: asyncSharedBullConfig.imports,
            providers: providers,
            exports: providers,
        };
    }
    static createAsyncSharedConfigurationProviders(configKey, options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncSharedConfigurationProvider(configKey, options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncSharedConfigurationProvider(configKey, options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncSharedConfigurationProvider(configKey, options) {
        if (options.useFactory) {
            return {
                provide: (0, get_shared_config_token_util_1.getSharedConfigToken)(configKey),
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass ||
                options.useExisting),
        ];
        return {
            provide: (0, get_shared_config_token_util_1.getSharedConfigToken)(configKey),
            useFactory: async (optionsFactory) => optionsFactory.createSharedConfiguration(),
            inject,
        };
    }
    static registerQueue(...options) {
        const queues = options.map(x => ({
            name: x.name,
        }));
        const providers = this.getUniqProviders(options);
        return {
            module: MQModule_1,
            imports: [bull_1.BullModule.registerQueue(...queues)],
            providers: providers,
            exports: providers
        };
    }
    static getUniqProviders(options) {
        return (options
            .map((option) => option.processors)
            .reduce((acc, i) => acc.concat(i || []), [])
            .filter((v, i, a) => a.indexOf(v) === i) || []);
    }
};
exports.MQModule = MQModule = MQModule_1 = __decorate([
    (0, common_1.Module)({})
], MQModule);
