import {Service} from '@tsed/di';
import * as Google from 'googleapis';

@Service()
export default class GoogleReportingService {
	private reporting: Google.analyticsreporting_v4.Analyticsreporting;

	constructor() {
		const auth = new Google.google.auth.GoogleAuth({
			scopes: [
				'https://www.googleapis.com/auth/analytics',
				'https://www.googleapis.com/auth/analytics.readonly',
			],
		});
		auth.getClient().then((a) => {
			Google.google.options({auth: a});
			this.reporting = Google.google.analyticsreporting('v4');
		});
	}

	public async get() {
		const data = await this.reporting.reports.batchGet({
			requestBody: {
				reportRequests: [
					{
						viewId: '162214118',
						dateRanges: [
							{
								startDate: '7daysAgo',
								endDate: 'today',
							},
						],
						metrics: [
							{
								expression: 'ga:sessions',
							},
						],
					},
				],
			},
		});
		return data;
	}
}
