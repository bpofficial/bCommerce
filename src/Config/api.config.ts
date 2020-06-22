import * as Path from 'path';
import Controllers from '../Controllers/';
import Entities from '../Entities';
import Middleware from '../Middleware';
import Protocols from '../Protocols';

const rootDir = Path.resolve(__dirname, '../src');
export default {
	rootDir,
	mount: {
		'/v1': Controllers,
	},
	componentsScan: ['${rootDir}/Services/**/*.{ts,js}', Protocols, Middleware],
	host: process.env.SERVER_HOST,
	port:
		process.env.NODE_ENV === 'production'
			? process.env.PORT || process.env.SERVER_HTTP_PORT
			: process.env.SERVER_DEV_HTTP_PORT,
	// Don't use a HTTPS port in production as AWS ELB will terminate SSL @ the load balancer.
	httpsPort: process.env.SERVER_DEV_HTTPS_PORT,
	acceptMimes: ['application/json'],
	typeorm: [
		{
			name: 'default',
			type: 'mysql',
			host: process.env.DB_HOST,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_TABLE,
			synchronize: true,
			entities: Entities,
		},
	],
	passport: {},
};
