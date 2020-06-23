import {Status, UseAuth} from '@tsed/common';
import {applyDecorators} from '@tsed/core';
import * as HttpStatus from 'http-status-codes';
import HMACAuthenticationMiddleware from '../Middleware/HMACAuthentication';

export interface ICustomAuthOptions {
	role?: string;
	scopes?: string[];
}

export default function SecureHMAC(options: ICustomAuthOptions = {}) {
	return applyDecorators(
		Status(HttpStatus.FORBIDDEN),
		Status(HttpStatus.INTERNAL_SERVER_ERROR),
		UseAuth(HMACAuthenticationMiddleware, options),
	);
}
