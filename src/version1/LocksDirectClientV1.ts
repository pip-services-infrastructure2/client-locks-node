import { ILocksClientV1 } from './ILocksClientV1';
import { DirectClient } from 'pip-services3-rpc-nodex';
import { DataPage, Descriptor, FilterParams, IdGenerator, PagingParams } from 'pip-services3-commons-nodex';
import { LockV1 } from './LockV1';


export class LocksDirectClientV1 extends DirectClient<any> implements ILocksClientV1 {

    private _clientId: string;

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('service-locks', 'controller', '*', '*', '1.0'));

        this._clientId = IdGenerator.nextLong();
    }

    public setClientId(client_id: string) {
        this._clientId = client_id;
    }

    public async getLocks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LockV1>> {
        let timing = this.instrument(correlationId, 'locks.get_locks');
        
        try {
            return await this._controller.getLocks(correlationId, filter, paging);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getLockById(correlationId: string, key: string): Promise<LockV1> {
        let timing = this.instrument(correlationId, 'locks.get_lock_by_id');
        
        try {
            return await this._controller.getLockById(correlationId, key);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async tryAcquireLock(correlationId: string, key: string, ttl: number): Promise<boolean> {
        let timing = this.instrument(correlationId, 'locks.try_acquire_lock');
        
        try {
            return await this._controller.tryAcquireLock(correlationId, key, ttl, this._clientId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async acquireLock(correlationId: string, key: string, ttl: number, timeout: number): Promise<void> {
        let timing = this.instrument(correlationId, 'locks.acquire_lock');
        
        try {
            return await this._controller.acquireLock(correlationId, key, ttl, timeout, this._clientId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async releaseLock(correlationId: string, key: string): Promise<void> {
        let timing = this.instrument(correlationId, 'locks.release_lock');
        
        try {
            return await this._controller.releaseLock(correlationId, key, this._clientId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}