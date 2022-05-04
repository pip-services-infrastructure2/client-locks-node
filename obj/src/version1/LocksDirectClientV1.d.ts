import { ILocksClientV1 } from './ILocksClientV1';
import { DirectClient } from 'pip-services3-rpc-nodex';
import { DataPage, FilterParams, PagingParams } from 'pip-services3-commons-nodex';
import { LockV1 } from './LockV1';
export declare class LocksDirectClientV1 extends DirectClient<any> implements ILocksClientV1 {
    private _clientId;
    constructor();
    setClientId(client_id: string): void;
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LockV1>>;
    getLockById(correlationId: string, key: string): Promise<LockV1>;
    tryAcquireLock(correlationId: string, key: string, ttl: number): Promise<boolean>;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number): Promise<void>;
    releaseLock(correlationId: string, key: string): Promise<void>;
}
