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
import CommerceTerm from '../../Database/Entities/TermEntity';

@Controller('/products/tags')
export default class CommerceProductTagController {
	@Get('/:id')
	public getTag(@PathParams('id') id: string) {}

	@Get()
	public getTags() {}

	@Post()
	public createTag() {}

	@Put('/:id')
	public updateTag(
		@PathParams('id') id: string,
		@BodyParams() update: Partial<CommerceTerm>,
	) {}

	@Delete('/:id')
	public deleteTag(@PathParams('id') id: string) {}
}
