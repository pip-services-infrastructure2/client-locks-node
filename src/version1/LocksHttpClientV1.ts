import { LockV1 } from './LockV1';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';
import { DateTimeConverter, FilterParams, PagingParams, DataPage, IdGenerator } from 'pip-services3-commons-nodex';
import { ILocksClientV1 } from './ILocksClientV1';

export class LocksHttpClientV1 extends CommandableHttpClient implements ILocksClientV1 {

    private _clientId: string;

    public constructor() {
        super('v1/locks');

        this._clientId = IdGenerator.nextLong();
    }

    public setClientId(client_id: string) {
        this._clientId = client_id;
    }

    public async getLocks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LockV1>> {
        let timing = this.instrument(correlationId, 'locks.get_records');

        try {
            let page = await this.callCommand<DataPage<LockV1>>(
                'get_records',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
            if (page == null || page.data.length == 0) return page;

                page.data = page.data.map((record) => this.fixLock(record));
                return page;
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
            let lock = await this.callCommand<LockV1>(
                'get_lock_by_id',
                correlationId,
                {
                    key: key
                }
            );

            return this.fixLock(lock);
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
            let result = await this.callCommand<boolean>(
                'try_acquire_lock',
                correlationId,
                {
                    key: key,
                    ttl: ttl,
                    client_id: this._clientId
                }
            );
            return result == true;
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
            await this.callCommand(
                'acquire_lock',
                correlationId,
                {
                    key: key,
                    ttl: ttl,
                    timeout: timeout,
                    client_id: this._clientId
                }
            );
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
            await this.callCommand(
                'release_lock',
                correlationId,
                {
                    key: key,
                    client_id: this._clientId
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    private fixLock(lock: LockV1): LockV1 {
        if (lock == null) return null;

        lock.created = DateTimeConverter.toNullableDateTime(lock.created);
        lock.expire_time = DateTimeConverter.toNullableDateTime(lock.expire_time);

        return lock;
    }
}