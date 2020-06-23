import {EndpointInfo, Inject, Req} from '@tsed/common';
import {
	BadRequest,
	Forbidden,
	InternalServerError,
	Unauthorized,
	UseProxy,
} from '@tsed/exceptions';
import {
	Arg,
	OnVerify,
	PassportMiddleware,
	Protocol,
	UserInfo,
} from '@tsed/passport';
import {ExtractJwt, Strategy, StrategyOptions} from 'passport-jwt';

@Protocol<StrategyOptions>({
	name: 'jwt',
	useStrategy: Strategy,
	settings: {
		ignoreExpiration: false,
		jwtFromRequest: ExtractJwt.fromExtractors([
			ExtractJwt.fromAuthHeaderAsBearerToken(), // This is used for Bearer Authentication
			(req) => req.cookies.access, // This is used for Cookie Authentication
		]),
		secretOrKey: process.env.JWT_SECRET,
	},
})
export default class BearerAuthentication implements OnVerify {
	public async $onVerify(
		@Req() req: Req,
		@Arg(0) token: {[i: string]: string | number},
		@EndpointInfo() endpoint: EndpointInfo,
	): Promise<UserInfo> {
		if (token instanceof String) {
			throw new InternalServerError('Invalid token.');
		}

		const {security} = endpoint.get(PassportMiddleware).options;

		// TODO: look into why using a cookie causes {anon: true}
		if (!req.cookies.access) {
			if (security?.anonymous) {
				return this._anonymous(token);
			} else if (security?.wholesale) {
				if (!('gid' in token)) {
					// gid being the GUID for the Wholesale account on Unleashed.
					throw new Unauthorized('Unauthorized');
				}
			}
		}
		const tokenString = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		if (
			!tokenString &&
			req.cookies.access &&
			String(token.sub).split('@')[1] === 'ballisticbeer.com.au'
		) {
			return {
				id: String(token.id),
				email: String(token.sub),
				password: null,
			};
		}
		const {sub: email = ''} = token;
		const user = {
			id: 1,
			userEmail: '',
			userActivationKey: tokenString,
		}; // await this.wordpressService.getUser(String(email));
		if (tokenString !== user.userActivationKey || !user) {
			throw new Unauthorized('Unauthorized');
		} else {
			return {
				id: String(user.id),
				email: user.userEmail,
				password: null,
			};
		}
	}

	private _anonymous(token): UserInfo {
		const {sub: email, nme: name, sec, exp: expiry} = token;
		if (!email || sec !== 'false') {
			throw new BadRequest('An email is required.');
		}
		return {
			id: token?.uid,
			email: email + '__' + name,
			password: null,
		};
	}
}
