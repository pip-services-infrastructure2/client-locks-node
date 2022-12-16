"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocksClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const LocksNullClientV1_1 = require("../version1/LocksNullClientV1");
const LocksDirectClientV1_1 = require("../version1/LocksDirectClientV1");
const LocksCommandableHttpClientV1_1 = require("../version1/LocksCommandableHttpClientV1");
const DirectLock_1 = require("../lock/DirectLock");
const HttpLock_1 = require("../lock/HttpLock");
class LocksClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(LocksClientFactory.DirectLockDescriptor, DirectLock_1.DirectLock);
        this.registerAsType(LocksClientFactory.HttpLockDescriptor, HttpLock_1.HttpLock);
        this.registerAsType(LocksClientFactory.NullClientV1Descriptor, LocksNullClientV1_1.LocksNullClientV1);
        this.registerAsType(LocksClientFactory.DirectClientV1Descriptor, LocksDirectClientV1_1.LocksDirectClientV1);
        this.registerAsType(LocksClientFactory.CmdHttpClientV1Descriptor, LocksCommandableHttpClientV1_1.LocksCommandableHttpClientV1);
    }
}
exports.LocksClientFactory = LocksClientFactory;
LocksClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('services-locks', 'factory', 'default', 'default', '1.0');
LocksClientFactory.DirectLockDescriptor = new pip_services3_commons_nodex_1.Descriptor('services-locks', 'lock', 'direct', 'default', '1.0');
LocksClientFactory.HttpLockDescriptor = new pip_services3_commons_nodex_1.Descriptor('services-locks', 'lock', 'http', 'default', '1.0');
LocksClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('services-locks', 'client', 'null', 'default', '1.0');
LocksClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('services-locks', 'client', 'direct', 'default', '1.0');
LocksClientFactory.CmdHttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('services-locks', 'client', 'commandable-http', 'default', '1.0');
//# sourceMappingURL=LocksClientFactory.js.map