import {
	$log,
	Err,
	GlobalErrorHandlerMiddleware,
	OverrideProvider,
	Req,
	Res,
} from '@tsed/common';
import {Exception} from '@tsed/exceptions';

@OverrideProvider(GlobalErrorHandlerMiddleware)
export default class APIErrorHandler extends GlobalErrorHandlerMiddleware {
	constructor() {
		$log.info('Global Error Handler Middleware loaded.');
		super();
	}

	public use(@Err() errors: Error, @Req() _: Req, @Res() response: Res): any {
		if (errors instanceof Exception) {
			response.status(errors.status).send({
				error: {
					code: errors.status,
					message: errors.message,
				},
			});
		} else {
			response.status(500).json({
				data: response.req.body.data || null,
				error: {
					code: 500,
					message: errors.message,
				},
			});
		}
	}
}
