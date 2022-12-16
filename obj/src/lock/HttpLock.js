"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpLock = void 0;
const AbstractLock_1 = require("./AbstractLock");
const LocksCommandableHttpClientV1_1 = require("../version1/LocksCommandableHttpClientV1");
class HttpLock extends AbstractLock_1.AbstractLock {
    constructor() {
        super(new LocksCommandableHttpClientV1_1.LocksCommandableHttpClientV1());
    }
}
exports.HttpLock = HttpLock;
//# sourceMappingURL=HttpLock.js.map