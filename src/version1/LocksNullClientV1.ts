import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { ILocksClientV1 } from './ILocksClientV1';
import { LockV1 } from './LockV1';

export class LocksNullClientV1 implements ILocksClientV1 {
    private _clientId: string;

    constructor(config?: any) { }
    
    public getLockById(correlationId: string, key: string): Promise<LockV1> {
        return;
    }

    public tryAcquireLock(correlationId: string, key: string, ttl: number): Promise<boolean> {
        return;
    }

    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number): Promise<void> {
        return;
    }

    public releaseLock(correlationId: string, key: string): Promise<void> {
        return;
    }
    
    public setClientId(client_id: string) {
        this._clientId = client_id;
    }

    public async getLocks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LockV1>> {
        return new DataPage<LockV1>();
    }
}
