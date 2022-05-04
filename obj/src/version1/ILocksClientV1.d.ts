import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { LockV1 } from './LockV1';
export interface ILocksClientV1 {
    setClientId(client_id: string): any;
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LockV1>>;
    getLockById(correlationId: string, key: string): Promise<LockV1>;
    tryAcquireLock(correlationId: string, key: string, ttl: number): Promise<boolean>;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number): Promise<void>;
    releaseLock(correlationId: string, key: string): Promise<void>;
}
