import {Service} from '@tsed/di';
import * as Google from 'googleapis';

@Service()
export default class GoogleAnalyticsService {
	private analytics: Google.analytics_v3.Analytics;

	constructor() {
		const auth = new Google.google.auth.GoogleAuth({
			scopes: [
				'https://www.googleapis.com/auth/analytics',
				'https://www.googleapis.com/auth/analytics.readonly',
			],
		});
		auth.getClient().then((a) => {
			Google.google.options({auth: a});
			this.analytics = Google.google.analytics('v3');
		});
	}

	public async get() {
		return this.analytics.data.ga.get();
	}
}
