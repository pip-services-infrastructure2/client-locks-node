const assert = require('chai').assert;

import { IdGenerator } from 'pip-services3-commons-nodex';
import { ILocksClientV1 } from '../../src/version1/ILocksClientV1';

let LOCK1: string = "lock_1";
let LOCK2: string = "lock_2";
let LOCK3: string = "lock_3";

export class LocksClientFixtureV1 {
    private _client: ILocksClientV1;
    private _clientId: string;
    private _adminId: string;

    constructor(client: ILocksClientV1, clientId: string, adminId: string) {
        this._client = client;
        this._clientId = clientId;
        this._adminId = adminId;
    }

    public async testTryAcquireLock() {
        // // Try to acquire lock for the first time
        // let result = await this._client.tryAcquireLock(null, LOCK1, 3000);

        // assert.isTrue(result);

        // // Try to acquire lock for the second time
        // result = await this._client.tryAcquireLock(null, LOCK1, 3000,);

        // assert.isFalse(result);

        // // Release the lock
        // await this._client.releaseLock(null, LOCK1);

        // // Try to acquire lock for the third time
        // result = await this._client.tryAcquireLock(null, LOCK1, 3000);

        // assert.isTrue(result);

        // // Release the lock
        // await this._client.releaseLock(null, LOCK1);

        // // Try to acquire lock for the fourth time
        // result = await this._client.tryAcquireLock(null, LOCK1, 4000);

        // assert.isTrue(result);

        // this._client.setClientId(IdGenerator.nextLong());

        // let err: Error;
        // try {
        //     await this._client.releaseLock(null, LOCK1);
        // } catch(e) {
        //     err = e;
        // }

        // assert.isNotNull(err || null); // should get an error

        // // Try to acquire lock to check it still exist
        // this._client.setClientId(this._clientId);
        // result = await this._client.tryAcquireLock(null, LOCK1, 4000);

        // assert.isFalse(result);

        // // Release the lock with admin id
        // this._client.setClientId(this._adminId);
        // await this._client.releaseLock(null, LOCK1);

        // // Try to acquire lock to check it not exist
        // this._client.setClientId(this._adminId);
        // result = await this._client.tryAcquireLock(null, LOCK1, 4000);

        // assert.isTrue(result);

        // // Release the lock
        // await this._client.releaseLock(null, LOCK1);
    }

    public async testAcquireLock() {
        // Acquire lock for the first time
        await this._client.acquireLock(null, LOCK2, 3000, 1000);

        // Acquire lock for the second time
        let err: Error;
        let r
        try {
            r = await this._client.acquireLock(null, LOCK2, 3000, 1000);
        } catch(e) {
            err = e;
        } 
        assert.isNotNull(err || null);

        // Release the lock
        await this._client.releaseLock(null, LOCK2);

        // Acquire lock for the third time
        await this._client.acquireLock(null, LOCK2, 3000, 1000);

        // Release the lock
        await this._client.releaseLock(null, LOCK2);
    }
}
