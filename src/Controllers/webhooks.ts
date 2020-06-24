/**
 *
 * Author: Brayden Phillips
 */
import {
	BodyParams,
	Controller,
	Delete,
	Get,
	PathParams,
	Post,
	Put,
} from '@tsed/common';

@Controller('/webhooks')
export default class CommerceWebhookController {
	@Get('/:id')
	public getWebhook(@PathParams('id') id: string) {}

	@Get()
	public getWebhooks() {}

	@Post()
	public createWebhook(@BodyParams() webhook: any) {}

	@Put('/:id')
	public updateWebhook(
		@PathParams('id') id: string,
		@BodyParams() update: any,
	) {}

	@Delete('/:id')
	public deleteWebhook(@PathParams('id') id: string) {}
}
