import '@tsed/ajv';
import {Configuration, Inject, PlatformApplication} from '@tsed/common';
import '@tsed/platform-express';
const compress = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors');

// tslint:disable-next-line: no-var-requires
require('dotenv').config({path: '.env'});
import config from './api.config'; // Import after env.
export const rootDir = __dirname;

@Configuration(config as any)
export class Server {
	@Inject()
	private app: PlatformApplication;

	@Configuration()
	private settings: Configuration;
	/**
	 * This method lets you configure the middleware required for your application to work.
	 * @returns {Server}
	 */
	public $beforeRoutesInit(): void | Promise<any> {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const bodyParser = require('body-parser');
		this.app
			.use(
				cors({
					credentials: true,
					origin: true,
				}),
			)
			.use(cookieParser())
			.use(compress({}))
			.use(methodOverride())
			.use(bodyParser.json())
			.use(
				bodyParser.urlencoded({
					extended: true,
				}),
			);
	}
}
