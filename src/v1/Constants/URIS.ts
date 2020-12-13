export const CLIENT_URL =
	process.env.NODE_ENV === 'production'
		? process.env.CLIENT_HOST
		: process.env.CLIENT_DEV_HOST;
