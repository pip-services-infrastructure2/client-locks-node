import { Lock } from "pip-services3-components-nodex";
import { ILocksClientV1 } from "../version1/ILocksClientV1";
import { ConfigParams } from "pip-services3-commons-nodex";
export declare class AbstractLock extends Lock {
    protected _client: ILocksClientV1;
    constructor(client: ILocksClientV1);
    configure(config: ConfigParams): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number): Promise<boolean>;
    releaseLock(correlationId: string, key: string): Promise<void>;
}
