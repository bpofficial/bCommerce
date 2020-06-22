import {ExpressApplication, PlatformTest} from '@tsed/common';
import * as SuperTest from 'supertest';
import {Server} from '../../src/Config/api';

xdescribe('Commerce Orders Endpoints: /v1/orders/*', () => {
	let request: SuperTest.SuperTest<SuperTest.Test>;

	beforeAll(PlatformTest.create);
	beforeAll(
		PlatformTest.inject(
			[ExpressApplication],
			(expressApplication: Server) => {
				request = SuperTest(expressApplication);
			},
		),
	);

	afterAll(PlatformTest.reset);

	describe('GET /v1/orders', () => {
		it('Should respond with a 200 status', async () => {
			await request.get('/v1/orders').expect(200);
		});
	});
});
