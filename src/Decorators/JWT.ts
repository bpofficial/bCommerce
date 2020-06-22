import {Status, UseAuth} from '@tsed/common';
import {applyDecorators} from '@tsed/core';
import {Authenticate} from '@tsed/passport';
import * as HttpStatus from 'http-status-codes';
import {AuthenticateOptions} from 'passport';
import CookieMiddleware from '../Middleware/CookieAuthentication';
import HMACMiddleWare from '../Middleware/HMACAuthentication';

export default function JWT(
	options: AuthenticateOptions & {security?: any} = {},
) {
	if (options.security?.cookie || options.security?.admin) {
		// Ignore cookies when testing.
		if (!process.env.TS_TEST) {
			return applyDecorators(
				options.security?.hmac ? UseAuth(HMACMiddleWare) : undefined,
				Status(HttpStatus.FORBIDDEN),
				Status(HttpStatus.INTERNAL_SERVER_ERROR),
				UseAuth(CookieMiddleware, options),
				Authenticate('jwt', options),
			);
		} else {
			return applyDecorators(
				options.security?.hmac ? UseAuth(HMACMiddleWare) : undefined,
				Status(HttpStatus.FORBIDDEN),
				Status(HttpStatus.INTERNAL_SERVER_ERROR),
			);
		}
	} else {
		return applyDecorators(
			options.security?.hmac ? UseAuth(HMACMiddleWare) : undefined,
			Status(HttpStatus.FORBIDDEN),
			Status(HttpStatus.INTERNAL_SERVER_ERROR),
			Authenticate('jwt', options),
		);
	}
}
