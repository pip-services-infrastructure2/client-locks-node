import { Descriptor, IdGenerator } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger, LogLevel } from 'pip-services3-components-nodex';

import { LocksMemoryPersistence } from 'service-locks-node';
import { LocksController } from 'service-locks-node';
import { LocksHttpServiceV1 } from 'service-locks-node';
import { ILocksClientV1 } from '../../src/version1/ILocksClientV1';
import { LocksCommandableHttpClientV1 } from '../../src/version1/LocksCommandableHttpClientV1';
import { LocksClientFixtureV1 } from './LocksClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('LocksCommandableHttpServiceV1', () => {
    let service: LocksHttpServiceV1;
    let client: LocksCommandableHttpClientV1;
    let fixture: LocksClientFixtureV1;

    setup(async () => {
        let logger = new ConsoleLogger();
        logger.setLevel(LogLevel.None);

        let persistence = new LocksMemoryPersistence();
        let controller = new LocksController();
        let client_id = IdGenerator.nextLong();
        let admin_id = IdGenerator.nextLong();
        
        service = new LocksHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-locks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-locks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-locks', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        controller.configure(ConfigParams.fromTuples(
            'options.release_own_locks_only', true,
            'options.release_admin_id', admin_id
        ));

        service.setReferences(references);

        client = new LocksCommandableHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new LocksClientFixtureV1(client, client_id, admin_id);

        await service.open(null);
        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('TryAcquireLock', async () => {
        await fixture.testTryAcquireLock();
    });

    test('AcquireLock', async () => {
        await fixture.testAcquireLock();
    });

});
