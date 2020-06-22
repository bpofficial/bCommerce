import {PlatformExpress} from '@tsed/platform-express';
import {$log} from 'ts-log-debug';
import {Server} from './Config/api';
require('module-alias/register');

const serverBootstrap = async (): Promise<void> => {
	try {
		$log.debug('Starting API...');
		const platform = await PlatformExpress.bootstrap(Server, {
			// extra settings
		});
		await platform.listen();
		$log.debug('Server initialized');
	} catch (er) {
		$log.error(er);
	}
};

serverBootstrap();
