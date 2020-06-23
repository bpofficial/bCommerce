import {Controller, Get, Status} from '@tsed/common';

@Controller('/health')
export default class CommerceHealthController {
	/**
	 * Check the health of the Server.
	 * This can include other service-related checks,
	 * however at this stage these are not required.
	 *
	 * Return a **200 OK** response to indicate healthy operation.
	 */
	@Get('/')
	@Status(200)
	public healthCheck() {
		return;
	}
}
