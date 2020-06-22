import {IMiddleware, Inject, Middleware, Req, Res} from '@tsed/common';
import {Unauthorized} from '@tsed/exceptions';
import JSONWebTokenService from '../Services/Authentication/JSONWebTokenService';

@Middleware()
export default class CookieJWTAuthentication implements IMiddleware {
	@Inject(JSONWebTokenService)
	private readonly jwtService: JSONWebTokenService;

	public use(@Req() request: Req) {
		const token = request.cookies.access;
		if (!token) {
			throw new Unauthorized('Unauthorized');
		}
		const verified = this.jwtService.verify(token);
		if (!verified) {
			throw new Unauthorized('Unauthorized');
		}
	}
}
