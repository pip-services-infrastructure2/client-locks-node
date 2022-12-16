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
exports.LocksDirectClientV1 = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class LocksDirectClientV1 extends pip_services3_rpc_nodex_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-locks', 'controller', '*', '*', '1.0'));
        this._clientId = pip_services3_commons_nodex_1.IdGenerator.nextLong();
    }
    setClientId(client_id) {
        this._clientId = client_id;
    }
    getLocks(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.get_locks');
            try {
                let res = yield this._controller.getLocks(correlationId, filter, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    getLockById(correlationId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.get_lock_by_id');
            try {
                let res = yield this._controller.getLockById(correlationId, key);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    tryAcquireLock(correlationId, key, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.try_acquire_lock');
            try {
                let res = yield this._controller.tryAcquireLock(correlationId, key, ttl, this._clientId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    acquireLock(correlationId, key, ttl, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.acquire_lock');
            try {
                let res = yield this._controller.acquireLock(correlationId, key, ttl, timeout, this._clientId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    releaseLock(correlationId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.release_lock');
            try {
                let res = yield this._controller.releaseLock(correlationId, key, this._clientId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
}
exports.LocksDirectClientV1 = LocksDirectClientV1;
//# sourceMappingURL=LocksDirectClientV1.js.map