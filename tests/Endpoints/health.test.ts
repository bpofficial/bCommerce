import {ExpressApplication} from '@tsed/common';
import {TestContext} from '@tsed/testing';
import * as SuperTest from 'supertest';
import {Server} from '../../src/Config/api';

xdescribe('Health Endpoints: /v1/health/*', () => {
	let request: SuperTest.SuperTest<SuperTest.Test>;

	beforeAll(TestContext.bootstrap(Server));
	beforeAll(
		TestContext.inject(
			[ExpressApplication],
			(expressApplication: Server) => {
				request = SuperTest(expressApplication);
			},
		),
	);

	afterAll(TestContext.reset);

	describe('GET /v1/health', () => {
		it('Should respond with a 200 status', async () => {
			await request.get('/v1/health').expect(200);
		});
	});
});
