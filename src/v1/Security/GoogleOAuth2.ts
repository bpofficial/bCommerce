import {Res} from '@tsed/common';
import {Inject} from '@tsed/di';
import {Args, OnVerify, Protocol} from '@tsed/passport';
import {Strategy, StrategyOptions} from 'passport-google-oauth20';

@Protocol<StrategyOptions>({
	name: 'google',
	useStrategy: Strategy,
	settings: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL:
			process.env.NODE_ENV === 'production'
				? 'https://api.ballisticbeer.com/v1/oauth/google/callback'
				: 'http://lvh.me/v1/oauth/google/callback',
	},
})
export default class Oauth2Protocol implements OnVerify {
	public async $onVerify(@Args() [, , profile]: any, @Res() res: Res) {
		const wpUser = {id: 1, profile: {__json: {email: ''}}}; // await this.userService.getUser(profile._json.email);
		if (!wpUser) {
			return res.redirect(
				process.env.NODE_ENV === 'production'
					? 'https://dash.ballisticbeeer.com/register'
					: 'http://lvh.me:3000/register',
			);
		}
		return {
			id: wpUser.id,
			email: profile._json.email,
		};
	}
}
