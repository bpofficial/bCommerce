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
import CommerceProductAttribute from '../../Database/Entities/ProductAttributeEntity';

@Controller('/products/attributes')
export default class CommerceProductAttributeController {
	@Get('/:id')
	public getAttribute(@PathParams('id') id: string) {}

	@Get()
	public getAttributes() {}

	@Post()
	public createAttribute() {}

	@Put('/:id')
	public updateAttribute(
		@PathParams('id') id: string,
		@BodyParams() update: Partial<CommerceProductAttribute>,
	) {}

	@Delete('/:id')
	public deleteAttribute(@PathParams('id') id: string) {}
}
