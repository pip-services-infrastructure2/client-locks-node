"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLock = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
class AbstractLock extends pip_services3_components_nodex_1.Lock {
    constructor(client) {
        super();
        this._client = client;
    }
    configure(config) {
        super.configure(config);
        let clientId = config.getAsStringWithDefault("options.client_id", null);
        if (clientId)
            this._client.setClientId(clientId);
    }
    tryAcquireLock(correlationId, key, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._client.tryAcquireLock(correlationId, key, ttl);
        });
    }
    releaseLock(correlationId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.releaseLock(correlationId, key);
        });
    }
}
exports.AbstractLock = AbstractLock;
//# sourceMappingURL=AbstractLock.js.map