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

@Controller('/products/variations')
export default class CommerceProductVariationController {
	@Get('/:id')
	public getVariation(@PathParams('id') id: string) {}

	@Get()
	public getVariations() {}

	@Post()
	public createVariation() {}

	@Put('/:id')
	public updateVariation(
		@PathParams('id') id: string,
		@BodyParams() update: Partial<CommerceTerm>,
	) {}

	@Delete('/:id')
	public deleteVariation(@PathParams('id') id: string) {}
}
