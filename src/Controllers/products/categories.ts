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

@Controller('/products/categories')
export default class CommerceProductCategoriesController {
	@Get('/:id')
	public getCategory(@PathParams('id') id: string) {}

	@Get()
	public getCategories() {}

	@Post()
	public createCategory() {}

	@Put('/:id')
	public updateCategory(
		@PathParams('id') id: string,
		@BodyParams() update: Partial<CommerceTerm>,
	) {}

	@Delete('/:id')
	public deleteCategory(@PathParams('id') id: string) {}
}
