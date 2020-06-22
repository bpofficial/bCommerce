import {
	$log,
	OverrideProvider,
	Res,
	ResponseData,
	SendResponseMiddleware,
} from '@tsed/common';

@OverrideProvider(SendResponseMiddleware)
export default class EnvelopeResponseMiddleware extends SendResponseMiddleware {
	constructor() {
		$log.info('Response Enveloping Middleware loaded.');
		super(null);
	}

	public use(@ResponseData() data: any, @Res() response: Res): any {
		if (!data && !response.req.body.errors) {
			if (response.statusCode) {
				response.json({
					status: {
						code: response.statusCode,
						message: response.statusMessage,
					},
				});
			}
		} else {
			return response.json({
				status: {
					code: response.statusCode,
					message: response.statusMessage,
				},
				data,
			});
		}
	}
}
