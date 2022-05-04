import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { LocksNullClientV1 } from '../version1/LocksNullClientV1';
import { LocksDirectClientV1 } from '../version1/LocksDirectClientV1';
import { LocksHttpClientV1 } from '../version1/LocksHttpClientV1';
import { DirectLock } from '../lock/DirectLock';
import { HttpLock } from '../lock/HttpLock';

export class LocksClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('services-locks', 'factory', 'default', 'default', '1.0');

	public static DirectLockDescriptor = new Descriptor('services-locks', 'lock', 'direct', 'default', '1.0');
	public static HttpLockDescriptor = new Descriptor('services-locks', 'lock', 'http', 'default', '1.0');

	public static NullClientV1Descriptor = new Descriptor('services-locks', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('services-locks', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('services-locks', 'client', 'http', 'default', '1.0');

	constructor() {
		super();

		this.registerAsType(LocksClientFactory.DirectLockDescriptor, DirectLock);
		this.registerAsType(LocksClientFactory.HttpLockDescriptor, HttpLock);

		this.registerAsType(LocksClientFactory.NullClientV1Descriptor, LocksNullClientV1);
		this.registerAsType(LocksClientFactory.DirectClientV1Descriptor, LocksDirectClientV1);
		this.registerAsType(LocksClientFactory.HttpClientV1Descriptor, LocksHttpClientV1);
	}
}
