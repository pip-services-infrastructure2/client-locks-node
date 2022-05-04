import { ILock, Lock } from "pip-services3-components-nodex";
import { ILocksClientV1 } from "../version1/ILocksClientV1";
import { ConfigParams, IdGenerator } from "pip-services3-commons-nodex";


export class AbstractLock extends Lock
{
    protected _client: ILocksClientV1;

    public constructor(client: ILocksClientV1) {
        super();

        this._client = client;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);

        let clientId = config.getAsStringWithDefault("options.client_id", null);
        if (clientId) this._client.setClientId(clientId);
    }
    
    public async tryAcquireLock(correlationId: string, key: string, ttl: number): Promise<boolean> {
        return await this._client.tryAcquireLock(correlationId, key, ttl);
    }

    public async releaseLock(correlationId: string, key: string): Promise<void> {
        await this._client.releaseLock(correlationId, key);
    }
}