const Security = {
	ANONYMOUS: {anonymous: true},
	ADMIN: {cookie: true},
	COOKIE: {cookie: true},
	WHOLESALE: {wholesale: true},
	HMAC: {
		ONLY: {hmac: true},
		ANONYMOUS: {hmac: true, anonymous: true},
		ADMIN: {hmac: true, cookie: true},
		COOKIE: {hmac: true, cookie: true},
		WHOLESALE: {hmac: true, wholesale: true},
	},
};

export default Security;
