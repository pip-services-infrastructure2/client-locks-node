import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ILocksClientV1 } from './ILocksClientV1';
import { LockV1 } from './LockV1';
export declare class LocksNullClientV1 implements ILocksClientV1 {
    private _clientId;
    constructor(config?: any);
    getLockById(correlationId: string, key: string): Promise<LockV1>;
    tryAcquireLock(correlationId: string, key: string, ttl: number): Promise<boolean>;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number): Promise<void>;
    releaseLock(correlationId: string, key: string): Promise<void>;
    setClientId(client_id: string): void;
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LockV1>>;
}
