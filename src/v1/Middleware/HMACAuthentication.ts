import {IMiddleware, Inject, Middleware, Req} from '@tsed/common';
import {Unauthorized} from '@tsed/exceptions';
import HMACSignatureService from '../Services/Authentication/HMACSignatureService';

@Middleware()
export default class HMACAuthenticationMiddleware implements IMiddleware {
	@Inject(HMACSignatureService)
	private readonly hmacService: HMACSignatureService;

	public use(@Req() request: Req) {
		const id = request.headers['api-auth-id'];
		const signature = request.headers['api-auth-signature'];
		if (
			!signature ||
			signature instanceof Array ||
			!id ||
			id instanceof Array ||
			id !== process.env.HMAC_APP_ID
		) {
			throw new Unauthorized('Unauthorized');
		}
		const {baseUrl: url} = request;
		const param = url?.indexOf('?') !== -1 ? url?.split('?')[1] : '';
		if (
			!this.hmacService.verify(param, signature, process.env.HMAC_APP_KEY)
		) {
			throw new Unauthorized('Unauthorized');
		}
	}
}
