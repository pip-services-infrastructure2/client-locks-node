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
exports.LocksHttpClientV1 = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class LocksHttpClientV1 extends pip_services3_rpc_nodex_1.CommandableHttpClient {
    constructor() {
        super('v1/locks');
        this._clientId = pip_services3_commons_nodex_1.IdGenerator.nextLong();
    }
    setClientId(client_id) {
        this._clientId = client_id;
    }
    getLocks(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.get_records');
            try {
                let page = yield this.callCommand('get_records', correlationId, {
                    filter: filter,
                    paging: paging
                });
                if (page == null || page.data.length == 0)
                    return page;
                page.data = page.data.map((record) => this.fixLock(record));
                return page;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    getLockById(correlationId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.get_lock_by_id');
            try {
                let lock = yield this.callCommand('get_lock_by_id', correlationId, {
                    key: key
                });
                return this.fixLock(lock);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    tryAcquireLock(correlationId, key, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.try_acquire_lock');
            try {
                let result = yield this.callCommand('try_acquire_lock', correlationId, {
                    key: key,
                    ttl: ttl,
                    client_id: this._clientId
                });
                return result == true;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    acquireLock(correlationId, key, ttl, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.acquire_lock');
            try {
                yield this.callCommand('acquire_lock', correlationId, {
                    key: key,
                    ttl: ttl,
                    timeout: timeout,
                    client_id: this._clientId
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    releaseLock(correlationId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'locks.release_lock');
            try {
                yield this.callCommand('release_lock', correlationId, {
                    key: key,
                    client_id: this._clientId
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    fixLock(lock) {
        if (lock == null)
            return null;
        lock.created = pip_services3_commons_nodex_1.DateTimeConverter.toNullableDateTime(lock.created);
        lock.expire_time = pip_services3_commons_nodex_1.DateTimeConverter.toNullableDateTime(lock.expire_time);
        return lock;
    }
}
exports.LocksHttpClientV1 = LocksHttpClientV1;
//# sourceMappingURL=LocksHttpClientV1.js.map