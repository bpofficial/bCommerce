import {PlatformTest} from '@tsed/common';
import {rootDir, Server} from '../src/Config/api';
import config from '../src/Config/api.config';

export default async function bootstrapServer(options?: any) {
	return PlatformTest.bootstrap(Server, {
		...(options ? options : {}),
		...config,
	});
}
