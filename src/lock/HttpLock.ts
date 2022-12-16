import { AbstractLock } from "./AbstractLock";
import { LocksCommandableHttpClientV1 } from "../version1/LocksCommandableHttpClientV1";

export class HttpLock extends AbstractLock {
    public constructor() {
        super(new LocksCommandableHttpClientV1());
    }
}